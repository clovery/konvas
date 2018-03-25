import Canvas from '../index';
/**
 * Dragger
 */
declare class Dragger {
    private canvas;
    private opts;
    private active;
    private dragging;
    private mouse;
    private startPoint;
    private x;
    private y;
    constructor(canvas: Canvas, opts: any);
    private initEvent();
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}
export default Dragger;
