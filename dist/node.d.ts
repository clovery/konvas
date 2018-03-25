/**
 *
 */
declare class Node {
    private el;
    private data;
    id: string;
    x: number;
    y: number;
    constructor(data: any);
    private initStyle();
    width: any;
    height: any;
    scale: any;
    move(x: number, y: number): void;
    draw(): void;
    toJSON(): {
        x: number;
        y: number;
        width: any;
        height: any;
        scale: any;
    };
}
export default Node;
