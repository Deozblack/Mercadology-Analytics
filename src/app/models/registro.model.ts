

export class RegistroModel{
    id: string;
    idTok?: string;
    nombre: string; 
    apellido: string;
    puesto?: string;
    rol?: string;
    depto?: string;
    correo?: string; 
    password?: string;
    telefono?: string;
    celular?: string;
    urlPhoto?: string;
    habilitado?: boolean;

    constructor(){
        this.habilitado = true;
    }
}

