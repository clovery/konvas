import Konvas from '../index';
/**
 * 坐标点以画布中的虚拟坐标点为准
 * 画布中坐标点计算方式
 * x: (e.pageX - konvas.left) / scale
 * y: (e.pageY - konvas.top) / scale
 *
 * 点击拖拽节点，获取点击位置相对节点边界的距离
 * offsetX: x - node.x
 * offsetY: y - node.y
 */
/**
 * Dragger
 */
declare class Dragger {
    private canvas;
    private opts;
    private active;
    private dragging;
    mouse: any;
    private offsetPoint;
    private x;
    private y;
    el: HTMLElement;
    private ee;
    constructor(canvas: Konvas, opts: any);
    private initEvent();
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    on(name: string, fn: any): void;
}
export default Dragger;
