export declare let globalConfig: GlobalConfig;
export interface GlobalConfig {
    /**接口地址 */
    handWriteApi?: string;
    /**dll目录 */
    dllPath?: string;
}
export declare function setKeyboardGlobalConfig(_globalConfig: GlobalConfig): void;
export declare function signUpKeyboard(): void;
export declare function setGlobalCb(cb: any): void;
