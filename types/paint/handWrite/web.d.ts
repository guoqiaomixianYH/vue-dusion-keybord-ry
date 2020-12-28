import { HandWrite } from "./index";
export default class WebHandWrite implements HandWrite {
    private api;
    private lib;
    constructor(api: string);
    createLib(lib: string): Promise<boolean>;
    private nowRequest;
    GetWords(lpXis: number[], lpYis: number[], lpCis: number[]): Promise<string[]>;
}
