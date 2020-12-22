# vue-dusion-keyboard

> 基于 vue.js 的一款 js 键盘，支持`拼音输入`和`手写输入`，`electron`下可离线运行，临时[demo 地址](http://jsrtj.fotoit.cn/iis/keyboard-demo/)

---

## 安装

### npm 安装

```
npm install vue-dusion-keyboard-ry -S
```

在 main.js 中写入以下内容全局注册：

```
全局注册
import VueDusionKeyboard from 'vue-dusion-keyboard-ry'
Vue.use(VueDusionKeyboard)

全局注册手写库地址
Vue.use(VueDusionKeyboard,{handWriteApi:''})

或者按组件注册
import {VueDusionKeyboard,Paint} from 'vue-dusion-keyboard-ry'
Vue.component('VueDusionKeyboard', VueDusionKeyboard)
Vue.component('Paint', Paint) //可省略
```

### 标签引入

```
<!--先引入vue.js-->
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
<script src="./VueDusionKeyboard.umd.min.js"></script>
<script>
new Vue({}).$mount('#app')
</script>
```

---

## 使用

在非`all`模式下，input 标签添加属性`data-mode`，然后在合适位置放置组件`<vue-dusion-keyboard></vue-dusion-keyboard>`即可。

```
<input type="text" data-mode="en_cap" />
<vue-dusion-keyboard float></vue-dusion-keyboard>
```

组件添加`all`属性即可为所有 input 标签注册弹出键盘

```
<vue-dusion-keyboard all float :blurHide="true" observer></vue-dusion-keyboard>
```

**对于 js 动态生成的输入框，vue-dusion-keyboard 提供以下两种方法注册**

- 加入监听属性`observer`。

```
<vue-dusion-keyboard all float observer></vue-dusion-keyboard>
```

- 当有新的 input 标签生成时，重新调用`sign_up_keyboard`方法注册。

```
window.sign_up_keyboard();
```

**Paint 组件**

- paint 组件为 vue-dusion-keyboard 内置写字板组件

```
<paint hand-write-api="xxx" @result="result"></paint>
```

---

## 模式

<!-- ### 离线模式

"main": "lib/VueDusionKeyboard.es.js",


 组件默认为离线模式，离线模式需要运行在[electron](https://electronjs.org)环境下，所需的控件有：
##### nodejs模块:
- `ffi`
- `ref`

ffi安装失败的小伙伴可以安装：
- `ffi-napi`
- `ref-napi`

##### C++库:
- `XDLL.dll` : 放置在electron根目录的`plug\\handWrite\\XDLL.dll`下。
##### 手写字库:
- `hz.mrd` : 中文字库，放置在`XDLL.dll`同目录下。
- `English.mrd` : 英文字库，放置在`XDLL.dll`同目录下。 -->

### 互联网模式

组件上添加`hand-write-api`属性即可切换互联网模式，可以直接运行在浏览器中

> 手写输入互联网接口地址见临时[demo 地址](http://jsrtj.fotoit.cn/iis/keyboard-demo/)。<br>注意：临时地址仅供学习之用，随时可能关闭。

---

## Animate.css

此项目引用了[animate.css](https://daneden.github.io/animate.css/)，用于键盘显示隐藏的过渡动画，内置 fadeInUp 和 fadeOutDown，如需其他效果，请引入 animate.css 文件，然后配置属性`enter-active-class`和`leave-active-class`

---

## input 标签属性

|     属性      | 说明                                                                                     | 类型   | 可选值                                 | 默认值   |
| :-----------: | :--------------------------------------------------------------------------------------- | :----- | :------------------------------------- | :------- |
| **data-mode** | 弹出输入法的类型：<br>`en_let` 英文小写<br>`en_cap` 英文大写<br>`cn` 中文<br>`hand` 手写 | String | `en_let`<br>`en_cap`<br>`cn`<br>`hand` | `en_let` |

## 组件属性

**vue-dusion-keyboard:**
|属性|说明|类型|可选值|默认值|
|:-:|:-|:-|:-|:-|
|**all**|是否为所有`input`标签注册弹出输入法|Boolean|true/false|false|
|**observer**|开启后会使用`MutationObserver`对 dom 更改进行监听，如果有新的 input 标签生成即为其注册键盘弹起事件|Boolean|true/false|true|
|**float**|是否使输入法组件浮动在当前`input`标签下方|Boolean|true/false|true|
|**blurHide**|当`input`标签失去焦点时是否隐藏输入组件|Boolean|true/false|true|
|**enter-active-class**|输入组件弹出来的动画效果，基于[Animate.css](https://daneden.github.io/animate.css/)|String|见 [Animate.css](https://daneden.github.io/animate.css/) 官网|fadeInUp|
|**leave-active-class**|输入组件隐藏时的动画效果|String|同上|fadeOutDown|
|**hand-write-api**|手写输入接口地址，不传则为离线 electron 模式|String|见[demo](http://jsrtj.fotoit.cn/iis/keyboard-demo/)|无
|**dll-path**|手写库 dll 路径，默认为`plug\\handWrite\\`|String|`plug\\handWrite\\`|无
|**pun_keys**|替换标点符号（16 个）|Array|略|无
|**num_pun_keys**|替换数字键盘左侧标点符号（4 个）|Array|略|无
|**scope**|搜索 input 的容器|String|略|body
|**body**|浮动相对的顶级容器|String|略|body

**paint:**
|属性|说明|类型|可选值|默认值|
|:-:|:-|:-|:-|:-|
|**show_result**|是否在右侧显示结果|Boolean|true/false|true|
|**lib**|手写识别库|string|CN/EN|CN|
|**hand-write-api**|手写输入接口地址，不传则为离线 electron 模式|String|见[demo](http://jsrtj.fotoit.cn/iis/keyboard-demo/)|无
|**dll-path**|手写库 dll 路径，默认为`plug\\handWrite\\`|String|`plug\\handWrite\\`|无

## 组件方法

**vue-dusion-keyboard:**
|方法名|说明|参数|
|:-:|:-|:-|
|sign_up_keyboard|重新注册 input 显示键盘,当页面有新的 input 标签出现时调用此方法|event|
**paint:**
无

## 组件事件

**vue-dusion-keyboard:**
|事件名|说明|参数|
|:-:|:-|:-|
|keyvalue|键盘输入事件|string|
|del|键盘输入事件|(text:被删除的字符,index:被删除字符的位置);|
**paint:**
|事件名|说明|参数|
|:-:|:-|:-|
|result|手写识别结果|string[]|

## 更新日志

#### v3.0.0

- 改为 rollup 打包
- 手写去除选择字库，默认中文+英文
- 改为 position: fixed;
- 改回 vue.extend 模式
- 手写请求自动取消上次一没返回结果的请求
- 增加 scope
- 增加 body
