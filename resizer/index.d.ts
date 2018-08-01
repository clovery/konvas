declare class Resizeable {
    el: any;
    cursors: any;
    private layout;
    private options;
    private controls;
    direction: any;
    start: any;
    startPoint: any;
    dragger: any;
    dragging: any;
    onMove: any;
    _scale: any;
    [key: string]: any;
    constructor(el?: any, options?: any);
    createCursor(type: string): void;
    hide(): void;
    show(): void;
    setCursor(type: string, x: number, y: number): void;
    width: any;
    height: any;
    y: any;
    x: any;
    onStop(): void;
    active(coords: any): void;
    update(coords?: any): void;
    draw(): void;
    /**
     *
     */
    move(x: any, y: any): void;
    scale: any;
}
export default Resizeable;
