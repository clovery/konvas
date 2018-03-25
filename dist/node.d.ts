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
    isDraggable: boolean;
    islocked: boolean;
    constructor(data: any);
    private initStyle();
    width: any;
    height: number;
    rotate: number;
    scale: any;
    lock(): void;
    unlock(): void;
    move(x: number, y: number): void;
    render(): void;
    toJSON(): {
        x: number;
        y: number;
        width: any;
        height: number;
        scale: any;
    };
}
export default Node;
