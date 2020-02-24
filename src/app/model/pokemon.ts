export class Pokemon {

    private _id: number;
    private _nombre: string;
    private _imagen: string;
    private _habilidades: Array<string>;


    constructor() {
        this._id = 0;
        this._nombre = 'Sin nombre';
        this._imagen = 'https://image.flaticon.com/icons/png/512/36/36601.png';
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

    public get imagen(): string {
        return this._imagen;
    }
    public set imagen(value: string) {
        this._imagen = value;
    }

    public get habilidades(): Array<string> {
        return this._habilidades;
    }
    public set habilidades(value: Array<string>) {
        this._habilidades = value;
    }
}