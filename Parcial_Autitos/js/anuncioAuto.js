import Anuncio from "./anuncio.js";

export default class Anuncio_Auto extends Anuncio {

    static getLocalStorage() {
        return "autos";
    }

    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    };

}