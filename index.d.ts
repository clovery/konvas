import Node from './node';
import Dragger from './dragger/index';
import Resizer from './resizer/index';
declare class Konvas {
    el: Element;
    opts: any;
    nodes: Node[];
    activeNode: Node | null;
    private nodesMap;
    layout: {
        width: number;
        height: number;
        scale: number;
    };
    private renders;
    resizer: Resizer | null;
    dragger: Dragger | null;
    [key: string]: any;
    constructor(el: Element | string, options: {
        width: number;
        height: number;
        scale: number;
        resizer: {
            enable: boolean;
        };
        dragger: {
            enable: boolean;
            boundaryRestrict: boolean;
        };
    } | undefined, renders: any);
    private initStyle();
    render(): void;
    addNode(node: Node | any): any;
    select(id: string): Node | null;
    getNode(node: Node | string): Node | null;
    readonly left: number;
    readonly top: number;
    scale(num: number): number | void;
    getScale(): number;
    setScale(num: number): void;
    readonly width: number;
    readonly height: number;
    toJSON(): {
        width: number;
        height: number;
        scale: (num: number) => number | void;
        nodes: {
            x: number;
            y: number;
            width: number;
            height: number;
            scale: any;
        }[];
    };
    setStyle(styles: {
        string: string;
    }): void;
    zoom(num: number): void;
    enable(flag: string): void;
    active(node: string): this;
}
export default Konvas;
