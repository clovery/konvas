/**
 *
 */
declare class Node {
    private el;
    private data;
    constructor(data: any);
    private initStyle();
    readonly x: number;
    readonly y: number;
    width: any;
    height: any;
    scale: any;
    draw(): void;
}
export default Node;
