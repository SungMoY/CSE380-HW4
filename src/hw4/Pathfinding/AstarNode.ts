import Vec2 from "../../Wolfie2D/DataTypes/Vec2";

export default class AstarNode {

    private _coords: Vec2;
    private _gVal: number;
    private _hVal: number;
    private _parent?: AstarNode;

    constructor(coords: Vec2, gVal: number, hVal: number, parent?: AstarNode) {
        this.coords = coords;
        this.gVal = gVal;
        this.hVal = hVal;
        this.parent = parent;
    }

    public get coords(): Vec2 {
        return this.coords;
    }

    public get gVal(): number {
        return this.gVal;
    }

    public get hVal(): number {
        return this.hVal;
    }

    public get parent(): AstarNode {
        return this.parent;
    }

    public set coords(coords: Vec2) {
        this.coords = coords;
    }

    public set gVal(gVal: number) {
        this.gVal = gVal;
    }

    public set hVal(hVal: number) {
        this.hVal = hVal;
    }

    public set parent(parent: AstarNode) {
        this.parent = parent;
    }
}