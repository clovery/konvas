declare class Cursor {
    private el;
    private type;
    private opts;
    x: any;
    y: any;
    constructor(el: any, opts: any);
    private initStyle();
    set(x: number, y: number): void;
}
export default Cursor;
