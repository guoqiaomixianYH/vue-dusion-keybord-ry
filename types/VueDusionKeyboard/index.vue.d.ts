import SvgDel from "./svg/svg-del.vue";
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
declare const _default: import("vue/types/vue").ExtendedVue<SvgDel, VueDusionKeyboardData, {
    /**监控dom变化，注册键盘弹出事件 */
    initMutationObserver(): void;
    cbAddedNode(addedNodes: NodeList): void;
    /**重新注册所有input标签 */
    sign_up_keyboard(): void;
    /**清理注册事件 */
    clean_sign_up(): void;
    addInputEventListener(input: HTMLInputElement): void;
    /**
     * 往上查找计算父元素的zoom
     * dom：父级document
     * zoom：计算的放大倍数
     * isThisParent：是否已经到达本控件所在的层级的父级
     */
    getZoom(dom: HTMLElement, zoom?: number): number;
    /**设置键盘位置 */
    SetKeyboardPosition(): void;
    /**显示键盘 */
    show_keyboard(event: FocusEvent): void;
    /**隐藏键盘 */
    hide_keyboard(event: FocusEvent): void;
    HideKey(): void;
    /**手写选择文字*/
    HandText(text: string): void;
    clickKey(event: Event, key: string, pass?: boolean | undefined): void;
    clickNumber(event: Event, key: string): void;
    clickCN(event: Event, text: string): void;
    del(): void;
    /**字符串插入文字 */
    insertString(text: string, input: string, index: number): string;
    /**删除字符串的某个字符*/
    delStringLast(text: string, index: number): string;
    /**光标归位*/
    TheEnd(index: number): void;
    cap_change(): void;
    cn_change(): void;
    num_change(): void;
    bd_change(): void;
    Fanhui(): void;
    previous_page(): void;
    next_page(): void;
}, {
    number_keys2: string[];
    letter_keys: string[];
    cn_list: string[];
    cut_cn_list: string[];
}, {
    float: boolean;
    all: boolean;
    observer: boolean;
    blurHide: boolean;
    LeaveActiveClass: string;
    EnterActiveClass: string;
    pun_keys: string[];
    num_pun_keys: string[];
    handWriteApi: string;
    dllPath: string;
    scope: string;
    body: string;
    bottom: string | number;
}>;
export default _default;
