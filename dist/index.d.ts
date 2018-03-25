import Node from './node';
declare class Konvas {
    elem: Element;
    private options;
    private dragger;
    nodes: Node[];
    activeNode: Node;
    layout: {
        width: number;
        height: number;
        scale: number;
    };
    constructor(el: Element | string, options?: {
        width: number;
        height: number;
        scale: number;
    });
    private initStyle();
    render(): void;
    addNode(node: Node | any): void;
    getNode(node: Node | string): Node | null;
    readonly left: number;
    readonly top: number;
    scale: number;
    readonly width: number;
    readonly height: number;
    toJSON(): {
        width: number;
        height: number;
        scale: number;
        nodes: {
            x: number;
            y: number;
            width: any;
            height: any;
            scale: any;
        }[];
    };
}
export default Konvas;
