import { Usuario } from '../model/usuario';

export interface IUsuarioService {


    estaLogeado(): boolean;

    /**
     * Comprueba que exista el usuario
     * @param nombre nombre de usuario
     * @param password password del usuario
     * @return Usuario con datos si existe, undefined si no existe
     */
    login(nombre: string, password: string) : Usuario;

    cerrarsesion(idUsuario: number);

}