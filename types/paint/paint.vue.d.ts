import Vue from "vue";
declare type FStrL = [string[], string[], string[], string[]];
interface PaintData {
    canvas: null | HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    write_result_temp: string[];
    isClick: boolean;
    clickX: number[];
    clickY: number[];
    clickC: number[];
    X: number;
    Y: number;
    old_X: number;
    old_Y: number;
    timer: number;
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue, PaintData, {
    /**更新canvas位置*/
    UpdateBound(): void;
    GetCx(ev: TouchEvent | MouseEvent): number;
    GetCy(ev: TouchEvent | MouseEvent): number;
    Down(ev: TouchEvent | MouseEvent): void;
    Move(ev: TouchEvent | MouseEvent): void;
    Mouseup(): void;
    Leave(): void;
    Reload(): void;
    GetText(): void;
    Select(text: string): void;
}, {
    write_result: FStrL;
}, {
    show_result: boolean;
    lib: string;
    handWriteApi: string;
    dllPath: string;
}>;
export default _default;
