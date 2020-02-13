import { Injectable } from '@angular/core';
import { IUsuarioService } from './IUsuario.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {

  private isLogged: boolean;
  private usuario: Usuario;
  private storage: any;

  constructor() {
    console.trace('UsuarioService constructor');
    this.isLogged = false;
    this.usuario = undefined;
    this.storage = window.sessionStorage;

  }// constructor



  estaLogeado(): boolean {
    console.trace('UsuarioService estaLogeado');
    if ( this.storage.getItem('usuarioStorage') ) {
      return true;
    } else {
      return false;
    }
  }// estaLogeado

  /**
   * Busca el usuario por nombre y password
   * @param nombre 
   * @param password 
   * @return Usuario con datos si existe, undefined si no encuentra
   */
  login(nombre: string, password: string): Usuario {
    console.trace('UsuarioService login nombre %s password %s', nombre, password);
    const NOMBRE = 'admin';
    const PASS = 'admin';
    let usuarioBuscar: Usuario; // si no enta en el if es "undefined"

    if ( NOMBRE === nombre && PASS === password ) {
      console.trace('usuario encontrado');
      // crear usuario
      usuarioBuscar = new Usuario();
      usuarioBuscar.nombre = nombre;
      usuarioBuscar.password = password;
      usuarioBuscar.id = 99;
      // marcar que esta logeado
      this.storage.setItem('usuarioStorage', JSON.stringify(usuarioBuscar) );

    } else {
      console.trace('usuario NO encontrado');
      this.storage.removeItem('usuarioStorage');
    }

    return usuarioBuscar;
  }// login

  cerrarsesion() {
    console.trace('UsuarioService cerrarSesion');
    this.storage.removeItem('usuarioStorage');
  }


}// UsuarioService
