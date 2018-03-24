import Node from './node';
declare class Konvas {
    elem: Element;
    private options;
    private nodes;
    constructor(el: Element | string, options?: {
        width: number;
        height: number;
    });
    private initStyle();
    addNode(node: Node | any): void;
}
export default Konvas;
