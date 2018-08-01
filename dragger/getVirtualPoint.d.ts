export interface IPoint {
    x: number;
    y: number;
}
export default function (evtPoint: IPoint, konvasOffset: IPoint, scale?: number, offsetPoint?: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
