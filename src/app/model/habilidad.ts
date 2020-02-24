export class Habilidad {

    private _id: number;
    private _nombre: string;
    private _checked: boolean;


    constructor() {
        this._id = 0;
        this._nombre = '---';
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get checked(): boolean {
        return this._checked;
    }
    public set checked(value: boolean) {
        this._checked = value;
    }



}