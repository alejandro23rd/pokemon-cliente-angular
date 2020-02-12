export class Pokemon {

    private _id: number;
    private _nombre: string;
    private _habilidades: Array<string>;


    constructor( nombre: string ) {
        this._id = 0;
        this._nombre = 'Sin nombre';
        this._habilidades = [];
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

    public get habilidades(): Array<string> {
        return this._habilidades;
    }
    public set habilidades(value: Array<string>) {
        this._habilidades = value;
    }
}