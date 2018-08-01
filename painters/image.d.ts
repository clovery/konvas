export default class Image {
    el: HTMLElement;
    data: any;
    node: any;
    type: string;
    constructor(node: any, data: any);
    render(opts?: any): void;
    paint(opts: any): void;
}
