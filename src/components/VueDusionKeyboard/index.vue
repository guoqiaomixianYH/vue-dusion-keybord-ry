<template>
  <transition
    :enter-active-class="'animated faster ' + EnterActiveClass"
    :leave-active-class="'animated faster ' + LeaveActiveClass"
  >
    <div
      v-show="show"
      :style="keyboardStyle"
      class="my-keyboard my-keyboard__mini"
      @mousedown.prevent
      ref="my_keyboard"
    >
      <!-- 数字键盘 -->
      <div v-if="mode === 'num' || mode === 'biaodian'" class="main-keyboard">
        <div class="pun-box" v-if="mode === 'num'">
          <span
            class="key number"
            style="margin-left: 0px"
            :key="index"
            v-for="(key, index) in num_pun_keys"
            @click="(e) => clickNumber(e, key)"
          >{{ key }}</span>
        </div>
        <div class="all-pun-box" v-if="mode === 'biaodian'">
          <span
            class="key number"
            :key="index"
            v-for="(key, index) in number_keys2"
            @click="(e) => clickNumber(e, key)"
          >{{ key }}</span>
        </div>
        <div class="number-box" v-if="mode === 'num'">
          <span
            class="key number"
            :key="index"
            v-for="(key, index) in number_keys2"
            @click="(e) => clickNumber(e, key)"
          >{{ key }}</span>
        </div>
        <div class="del-box">
          <span class="key number num-del" @click="del">
            <svg-del class="del"></svg-del>
          </span>
          <!-- <span v-if="mode==='biaodian'" class="key number blue"></span>
          <span v-else class="key number" @click="mode='biaodian'">标点</span>-->
          <span class="key number blue" @click="mode = 'en_cap'">中/英</span>
          <span class="key key_hide number" style="margin-left: 0px" @click="HideKey">
            <svg-keyboard class="jp"></svg-keyboard>
            <span>
              隐藏
              <br />
              <i style="display: block; transform: scaleX(2)">v</i>
            </span>
          </span>
          <span class="key number blue" @click="Fanhui">返回</span>
        </div>
      </div>
      <!-- 手写键盘 -->
      <div
        v-else-if="mode === 'hand' && main_width"
        class="main-keyboard"
        style="min-width:1080px;padding-top:8px;"
      >
        <div class="hand-left-box" style="margin-right:6px;">
          <span class="key" @click="(e) => clickKey(e, '!', true)">:</span>
          <span class="key" @click="(e) => clickKey(e, ',', true)">,</span>
          <span class="key" @click="(e) => clickKey(e, '.', true)">.</span>
          <span class="key" @click="(e) => clickKey(e, '?', true)">;</span>
          <span class="key" @click="(e) => clickKey(e, '@', true)">@</span>
        </div>
        <paint
          @SelectText="HandText"
          :lib="handLib"
          :handWriteApi="handWriteApi"
          :dllPath="dllPath"
        ></paint>
        <div class="hand-left-box">
          <span class="key hand-del" @click="del">
            <svg-del class="del"></svg-del>
          </span>
          <span class="key key_hide" @click="HideKey">
            <svg-keyboard class="jp"></svg-keyboard>
            <span>
              隐藏
              <br />
              <i style="display: block; transform: scaleX(2)">v</i>
            </span>
          </span>
          <span class="key blue" @click="mode = 'biaodian'">标点</span>
          <span class="key blue" @click="mode = 'num'">数字</span>
          <span class="key blue" @click="mode = 'en_cap'">键盘</span>
        </div>
      </div>
      <!-- 普通键盘 -->
      <div v-else class="main-keyboard">
        <div v-if="mode === 'cn'" class="pinyin">
          <div>
            <span>{{ cn_input }}</span>
          </div>
        </div>
        <div v-if="mode === 'cn'" class="select-list">
          <div>
            <span
              class="select-text"
              v-for="(text, index) in cut_cn_list"
              :key="index"
              @click="(e) => clickCN(e, text)"
            >{{ index + 1 + "." + text }}</span>
            <div class="page">
              <p class="previous" @click="previous_page">v</p>
              <p class="next" @click="next_page">v</p>
            </div>
          </div>
        </div>
        <span
          class="key"
          v-for="(key, index) in number_keys"
          :key="index + 50"
          @click="(e) => clickNumber(e, key)"
        >{{ key }}</span>
        <br />
        <span
          class="key letter"
          v-for="(key, index) in letter_keys.slice(0, 10)"
          :key="index + 11"
          @click="(e) => clickKey(e, key)"
        >{{ key }}</span>
        <br />
        <span
          class="key letter"
          v-for="(key, index) in letter_keys.slice(10, 19)"
          :key="index + 21"
          @click="(e) => clickKey(e, key)"
        >{{ key }}</span>
        <br />
        <span
          v-if="mode === 'cn' || mode === 'en_cap'"
          class="key cap_change"
          style="background: #728fa8"
          @click="cap_change"
        >{{ mode === "cn" ? "" : "已锁定大写" }}</span>
        <span v-else class="key cap_change" @click="cap_change">切换大写</span>
        <span
          class="key letter"
          v-for="(key, index) in letter_keys.slice(19, 26)"
          :key="index + 31"
          @click="(e) => clickKey(e, key)"
        >{{ key }}</span>
        <span class="key key_hide" @click="HideKey">
          <svg-keyboard class="jp"></svg-keyboard>
          <span>
            隐藏
            <br />
            <i style="display: block; transform: scaleX(2)">v</i>
          </span>
        </span>
        <br />
        <span v-if="mode === 'cn'" @click="cn_change" class="key blue">
          中 /
          <i style="font-size: 16px; font-weight: 500">英</i>
        </span>
        <span v-else @click="cn_change" class="key blue">
          英 /
          <i style="font-size: 16px; font-weight: 500">中</i>
        </span>
        <span @click="mode = 'hand'" class="key red">手写</span>
        <span @click="num_change" class="key blue">数字</span>
        <span @click="bd_change" class="key blue">标点</span>
        <!-- <span class="key" @click="e=>clickKey(e, '@',true)">@</span> -->
        <span class="key" @click="(e) => clickKey(e, '.', true)">.</span>
        <span class="key space" @click="(e) => clickKey(e, ' ', true)">空格</span>
        <span class="key def-del" style="width: 140px" @click="del()">
          <svg-del class="del"></svg-del>
        </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import AllKey from "./key";
import * as dict from "./dict/pinyin_dict_notone.json";
import SvgDel from "./svg/svg-del.vue";
import SvgKeyboard from "./svg/svg-keybord.vue";
import Paint from "../paint/paint.vue";
import Vue from "vue";
import { setGlobalCb } from "../globalConfig";

interface VueDusionKeyboardData {
  inputElement: HTMLInputElement | null;
  keyboardStyle: any;
  show: boolean;
  input_top: number;
  mode: string;
  old_mode: string;
  main_width: number;
  main_height: number;
  number_keys: string[];
  cn_input: string;
  cn_list_str: string;
  l_min: number;
  l_max: number;
  handLib: string;
}

export default Vue.extend({
  name: "VueDusionKeyboard",
  components: { Paint, SvgDel, SvgKeyboard },
  mounted() {
    this.$nextTick(() => {
      if (this.observer) {
        this.initMutationObserver();
      }
      setGlobalCb(this.sign_up_keyboard());
      if (this.float) {
        // document.addEventListener("animationend", this.SetKeyboardPosition);
        document.addEventListener("scroll", this.SetKeyboardPosition);
      }
    });
  },
  beforeDestroy() {
    this.clean_sign_up();
    if (this.float) {
      // document.removeEventListener("animationend", this.SetKeyboardPosition);
      document.removeEventListener("scroll", this.SetKeyboardPosition);
    }
  },
  props: {
    float: { type: Boolean, default: true },
    all: { type: Boolean, default: false },
    observer: { type: Boolean, default: false },
    blurHide: { type: Boolean, default: true },
    LeaveActiveClass: { default: "fadeOutDown" },
    EnterActiveClass: { default: "fadeInUp" },
    pun_keys: { default: () => AllKey.punctuation },
    num_pun_keys: { default: () => AllKey.num_pun },
    handWriteApi: String,
    dllPath: String,
    scope: String,
    /**顶级容器，默认'body' */
    body: String,
    /**添加 bottom - 如果设置值，就自定义底部位置 */
    bottom: {type: String,default: 0},
  },
  data(): VueDusionKeyboardData {
    return {
      inputElement: null,
      keyboardStyle: {},
      show: false,
      input_top: 0,
      mode: "cn",
      old_mode: "en_cap",
      main_width: 0,
      main_height: 0,
      number_keys: AllKey.number,
      cn_input: "",
      cn_list_str: "",
      l_min: 0,
      l_max: 10,
      handLib: "CN",
    };
  },
  watch: {
    mode(val: string, oldVal: string) {
      const myKeyboard = this.$refs.my_keyboard as HTMLDivElement;
      this.old_mode = oldVal;
      if (val == "hand") {
        this.$nextTick(() => {
          this.main_width = myKeyboard.offsetWidth;
          this.main_height = myKeyboard.offsetHeight;
        });
      }
    },
  },
  computed: {
    number_keys2(): string[] {
      return this.mode === "num" ? AllKey.number2 : this.pun_keys;
    },
    letter_keys(): string[] {
      return this.mode === "en_cap" ? AllKey.cap_letter : AllKey.letter;
    },
    cn_list(): string[] {
      return this.cn_list_str ? this.cn_list_str.split("") : [];
    },
    cut_cn_list(): string[] {
      return this.cn_list.slice(this.l_min, this.l_max);
    },
  },
  methods: {
    /**监控dom变化，注册键盘弹出事件 */
    initMutationObserver() {
      let mutationObserver = new MutationObserver((mutations, observer) => {
        mutations.forEach((mutation) => {
          this.cbAddedNode(mutation.addedNodes);
        });
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false,
      });
    },

    cbAddedNode(addedNodes: NodeList) {
      for (const addedNode of addedNodes) {
        // console.log(addedNode.nodeName);
        if (addedNode.nodeName == "INPUT")
          this.addInputEventListener(addedNode as HTMLInputElement);
        if (addedNode.childNodes.length) this.cbAddedNode(addedNode.childNodes);
      }
    },

    /**重新注册所有input标签 */
    sign_up_keyboard() {
      let element = this.scope ? document.querySelector(this.scope) : null;
      // console.log(element);

      //每个input添加事件
      let inputAll = (element || document).querySelectorAll(
        "input,textarea"
      ) as NodeListOf<HTMLInputElement>;
      inputAll.forEach((input) => {
        this.addInputEventListener(input);
      });
    },
    /**清理注册事件 */
    clean_sign_up() {
      let element = this.scope ? document.querySelector(this.scope) : null;
      let inputAll = (element || document).querySelectorAll(
        "input,textarea"
      ) as NodeListOf<HTMLInputElement>;
      inputAll.forEach((input) => {
        input.removeEventListener("focus", this.show_keyboard);
        input.removeEventListener("blur", this.hide_keyboard);
      });
    },
    addInputEventListener(input: HTMLInputElement) {
      if (this.all || input.dataset.mode) {
        input.addEventListener("focus", this.show_keyboard);
        if (this.blurHide) {
          input.addEventListener("blur", this.hide_keyboard);
        }
      }
    },
    /**
     * 往上查找计算父元素的zoom
     * dom：父级document
     * zoom：计算的放大倍数
     * isThisParent：是否已经到达本控件所在的层级的父级
     */
    getZoom(dom: HTMLElement, zoom: number = 1): number {
      //当前dom的zoom
      let m_zoom =
        dom.style.zoom || window.getComputedStyle(dom, null).zoom || "1";
      zoom = zoom * parseFloat(m_zoom);

      let isThisParent = false;
      let children = dom.children;
      for (let i = 0; i < children.length; i++) {
        if (this.$el == children[i]) {
          isThisParent = true;
          continue;
        }
      }
      //到达最上级
      if (dom.parentNode == document) {
        return zoom;
      }
      //到达插件的父级，并且position=relative，停止往上计算
      if (isThisParent) {
        let position =
          dom.style.position || window.getComputedStyle(dom, null).position;
        if (position == "relative") return zoom;
      }

      return this.getZoom(dom.parentNode as HTMLElement, zoom);
    },

    /**设置键盘位置 */
    SetKeyboardPosition() {
      if (!this.inputElement) return;
      let bound = this.inputElement.getBoundingClientRect();
      let toptop = 0; //document.documentElement.scrollTop;
      //当css设置了zoom时
      let zoom = this.getZoom(this.inputElement);
      // console.log(zoom);
      let $el = this.$el.children[0];
      let bodyEl =
        (this.body && document.querySelector(this.body)) || document.body;
      let bodyBound = bodyEl.getBoundingClientRect();

      let st_top = (bound.y + bound.height + 10 + toptop) * zoom;
      // console.log(bound);
      // this.keyboardStyle = {
      //   position: "fixed",
      //   left: bodyBound.left + bodyBound.width / 2 - $el.clientWidth / 2 + "px",
      //   "z-index": "99999",
      //   top: st_top + "px",
      // };
      /**
       * 修改 - 支持bottom 适用：输入框太低时，弹框被遮挡问题 by renyong 2020/12/21
       */
      if(this.bottom && this.bottom > 0){
        this.keyboardStyle = {
          position: "fixed",
          left: bodyBound.left + bodyBound.width / 2 - $el.clientWidth / 2 + "px",
          bottom: Number(this.bottom) + "px",
        };
      }else{
        this.keyboardStyle = {
          position: "fixed",
          left: bodyBound.left + bodyBound.width / 2 - $el.clientWidth / 2 + "px",
          "z-index": "99999",
          top: st_top + "px",
        };
      }
    },
    /**显示键盘 */
    show_keyboard(event: FocusEvent) {
      // console.log("show");
      if (!event.target) return;
      this.inputElement = event.target as HTMLInputElement;
      this.show = true;
      if (this.inputElement.dataset.mode) {
        this.mode = this.inputElement.dataset.mode;
      }
      if (this.inputElement && this.float) {
        this.$nextTick(() => {
          this.SetKeyboardPosition();
        });
      }
    },
    /**隐藏键盘 */
    hide_keyboard(event: FocusEvent) {
      // console.log("hide");
      let element = event.relatedTarget as HTMLElement;
      if (
        !element ||
        element.tagName != "INPUT" ||
        (!this.all && !element.dataset.mode)
      ) {
        this.show = false;
      }
    },

    HideKey() {
      this.show = false;
      this.inputElement && this.inputElement.blur();
    },
    // mousedown(event: MouseEvent) {
    //   // console.log(this.inputElement);
    //   event.preventDefault();
    // }
    /**手写选择文字*/
    HandText(text: string) {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      let index = this.inputElement.selectionStart || 0;
      this.inputElement.value = this.insertString(
        this.inputElement.value,
        text,
        index
      );
      this.TheEnd(index + 1);
      //触发input事件
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    },
    //点击按钮
    clickKey(event: Event, key: string, pass?: boolean) {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      let index = this.inputElement.selectionStart || 0;
      event.preventDefault();
      this.$emit("keyvalue", key);
      if (this.mode === "cn" && !pass) {
        this.cn_input += key;
        this.l_min = 0;
        this.l_max = 10;

        let re = new RegExp(`^${this.cn_input}\\w*`);
        let keys = Object.keys(dict)
          .filter((key) => re.test(key))
          .sort();
        // console.log(keys);
        this.cn_list_str =
          keys.length > 1
            ? keys.reduce((a, b) => a + dict[b], "")
            : dict[keys[0]]; //dict[this.cn_input];
      } else {
        // this.inputElement.value += key;
        this.inputElement.value = this.insertString(
          this.inputElement.value,
          key,
          index
        );
        this.TheEnd(index + 1);
      }
      //触发input事件
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    },
    clickNumber(event: Event, key: string) {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      let index = this.inputElement.selectionStart || 0;
      event.preventDefault();
      if (this.mode === "cn" && this.cn_input !== "") {
        this.inputElement.value += this.cut_cn_list[parseInt(key) - 1];
        this.cn_input = "";
        this.cn_list_str = "";
      } else {
        // this.inputElement.value += key;
        this.inputElement.value = this.insertString(
          this.inputElement.value,
          key,
          index
        );
        this.TheEnd(index + 1);
      }
      //触发input事件
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    },
    clickCN(event: Event, text: string) {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      let index = this.inputElement.selectionStart || 0;
      event.preventDefault();
      // this.inputElement.value += text;
      this.inputElement.value = this.insertString(
        this.inputElement.value,
        text,
        index
      );
      this.cn_input = "";
      this.cn_list_str = "";
      //触发input事件
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      this.TheEnd(index + 1);
    },
    del() {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      let index = this.inputElement.selectionStart || 0;
      if (this.mode === "cn" && this.cn_input !== "") {
        this.cn_input = this.delStringLast(
          this.cn_input,
          this.cn_input.length - 1
        );
        this.l_min = 0;
        this.l_max = 10;
        this.cn_list_str = dict[this.cn_input];
      } else {
        this.inputElement.value = this.delStringLast(
          this.inputElement.value,
          index - 1
        );
        this.TheEnd(index - 1);
      }
      //触发input事件
      this.inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    },
    /**字符串插入文字 */
    insertString(text: string, input: string, index: number) {
      let arrText = text.split("");
      arrText.splice(index, 0, input);
      return arrText.join("");
    },
    /**删除字符串的某个字符*/
    delStringLast(text: string, index: number) {
      let arrText = text.split("");
      this.$emit("del", arrText[index], index + 1);
      arrText[index] = "";
      // arrText.pop();
      return arrText.join("");
    },
    /**光标归位*/
    TheEnd(index: number) {
      if (!this.inputElement || this.inputElement !== document.activeElement)
        return;
      this.inputElement.selectionStart = index;
      this.inputElement.selectionEnd = index;
    },
    cap_change() {
      if (this.mode !== "cn") {
        this.mode = this.mode === "en_cap" ? "en_let" : "en_cap";
      }
    },
    cn_change() {
      this.mode = this.mode === "cn" ? "en_cap" : "cn";
      this.cn_input = "";
      this.cn_list_str = "";
    },
    num_change() {
      this.mode = "num";
    },
    bd_change() {
      this.mode = "biaodian";
    },
    Fanhui() {
      this.mode = this.old_mode;
    },
    previous_page() {
      if (this.l_min > 0) {
        this.l_min = this.l_min - 10;
        this.l_max = this.l_max - 10;
      }
    },
    next_page() {
      if (this.cn_list.length > this.l_max) {
        this.l_min += 10;
        this.l_max += 10;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./style/mini.scss";
i {
  font-style: normal;
}
.num-del > svg {
  margin-top: 0.6rem;
}
.def-del > svg {
  margin-top: 0px;
}
.hand-del > svg {
  margin-top: 0px;
}
.my-keyboard {
  // margin: 0 auto;
  // left: 0;
  // right: 0;
  // width: 0px;
  // min-width: $min-width;
  // height: 300px;
  
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .pinyin,
  .select-list {
    > div {
      // width: $min-width;
      margin: 0 auto;
    }
  }
  .pinyin {
    margin-top: 0.87rem;
    box-sizing: border-box;
    height: 1.87rem;
    background: #fff;
    border: 1px solid rgba(209, 209, 209, 1);
    border-top-right-radius: 0.6rem;
    border-top-left-radius: 0.6rem;
    padding: 0 1.25rem;
    text-align: left;
    > div span {
      font-size: 1.25rem;
      line-height: 1.87rem;
      font-weight: bold;
    }
  }
  .select-list {
    height: 3.12rem;
    background: #fff;
    border: 1px solid rgba(209, 209, 209, 1);
    border-top: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 0;
    text-align: left;
    > div {
      position: relative;
    }
    .select-text {
      cursor: pointer;
      line-height: 3.12rem;
      font-size: 1.5rem;
      font-weight: bold;
      & + .select-text {
        margin-left: 2.6rem;
      }
      &:nth-of-type(1) {
        margin-left: 1.25rem;
      }
    }
    .page {
      position: absolute;
      top: 0;
      right: 0.43rem;
      width: 7.5rem;
      height: 3.12rem;
      .previous {
        transform: scaleX(2) rotate(180deg);
      }
      > p {
        margin-top: 0px;
        margin-bottom: 0px;
        display: inline-block;
        text-align: center;
        transform: scaleX(2);
        width: 1.87rem;
        height: 3rem;
        line-height: 3rem;
        background: #344a5d;
        color: #fff;
        border: 1px solid hsl(0, 0%, 84%);
        border-radius: 0.06rem;
        cursor: pointer;
        &:active {
          background: #fff;
          color: #344a5d;
        }
        & + p {
          margin-left: 1.87rem;
        }
      }
    }
  }
  .main-keyboard {
    // width: 1080px;
    display: inline-block;
    border-radius: 0.62rem;
    padding: 0 0.87rem 0.87rem 0.87rem;
    background: #e6e6e6;
    // height: 400px;
    .key {
      height: 3.75rem;
      line-height: 3.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      // width: $key-width;
      background: #fff;
      display: inline-block;
      vertical-align: middle;
      border-radius: 0.5rem;
      margin-top: 0.87rem;
      box-shadow: 1px 1px 2px rgba(20, 20, 20, 0.3);
      cursor: pointer;
      &:active {
        background: #d0d0d0;
      }
      // & + .key {
      //   margin-left: 28px;
      // }
    }
    .all-pun-box,
    .pun-box,
    .number-box,
    .del-box {
      display: inline-block;
      vertical-align: middle;
    }

    .del-box,
    .pun-box {
      .key {
        margin-left: 0px;
      }
    }
    .hand-left-box {
      width: 9.37rem;
      display: inline-block;
      vertical-align: middle;
      .key {
        width: 8.75rem;
        margin-left: 0px;
        margin-top: 1.25rem;
        &:nth-of-type(1) {
          margin-top: 0px;
        }
      }
    }
    .number {
      // width: $number-width;
      height: 5rem;
      font-size: 3.37rem;
      line-height: 5rem;
    }
    .cap_change {
      width: 8.75rem;
      color: #fff;
      background: #344a5d;
      &:active {
        background: #728fa8;
      }
    }
    .key_hide {
      background: #d6d1d0;
      width: 8.75rem;
      > .jp {
        height: 3.43rem;
        display: inline-block;
        vertical-align: middle;
      }
      > span {
        padding-left: 0.31rem;
        font-size: 1rem;
        line-height: 1.12rem;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .blue {
      color: #fff;
      background: #344a5d;
      &:active {
        background: #728fa8;
      }
    }
    .red {
      color: #fff;
      background: #f56c6c;
      &:active {
        background: #f89e9e;
      }
    }
    // .space {
    //   width: 338px;
    // }
  }
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@-webkit-keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}

.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown;
}

.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}
</style>