import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{

  constructor (private router: Router, private usuarioService: UsuarioService){
    console.debug('LoginGuard constructor');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.debug('LoginGuard canActivate');

    let logeado : boolean = this.usuarioService.estaLogeado();

    
    if(!logeado){
      //si no esta logeado
      this.router.navigate(['login']);

    }else{
      //si esta logeado mandar mensaje de esta logeado

    }

    return logeado;
    


    //TODO crear provider o servicio para login de usuario
    //TODO servicio rest contra MySql

    return false;
  }
  
}