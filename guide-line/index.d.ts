/**
 * guide lines
 *
 * |----|----|
 * |    |    |
 * |----|----|
 * |    |    |
 * |----|----|
 */
declare class GuideLine {
    private container;
    private vertical;
    private horizontal;
    private left;
    private center;
    private right;
    private top;
    private middle;
    private bottom;
    [index: string]: any;
    constructor(container: any);
    node(dir: string): HTMLDivElement;
    update(coords: any): void;
}
export default GuideLine;
