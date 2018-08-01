/**
 *
 */
declare class Node {
    private el;
    private data;
    id: string;
    left: number;
    top: number;
    private wrapper;
    layout: any;
    private opts;
    private painter;
    isDraggable: boolean;
    islocked: boolean;
    constructor(data: any, opts: any);
    private initStyle();
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
    readonly scale: any;
    rotate(deg: number): this;
    setScale(val: number): void;
    getScale(): any;
    lock(): void;
    unlock(): void;
    move(x: number, y: number): this;
    get(type: string): any;
    render(): void;
    wrap(el: HTMLElement): void;
    toJSON(): {
        x: number;
        y: number;
        width: number;
        height: number;
        scale: any;
    };
}
export default Node;
