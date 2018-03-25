/**
 *
 */
declare class Node {
    private el;
    private data;
    id: string;
    x: number;
    y: number;
    layout: {
        rotate: number;
    };
    constructor(data: any);
    private initStyle();
    width: any;
    height: number;
    rotate: number;
    scale: any;
    move(x: number, y: number): void;
    draw(): void;
    toJSON(): {
        x: number;
        y: number;
        width: any;
        height: number;
        scale: any;
    };
}
export default Node;
