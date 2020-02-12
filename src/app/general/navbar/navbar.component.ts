import { Component, OnInit } from '@angular/core';
import { RUTAS } from 'src/app/rutas';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  rutas: Array<any>;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    console.trace('NavbarComponent constructor');
    this.rutas = RUTAS;
  }// constructor

  ngOnInit() {
    console.trace('NavbarComponent ngOnInit');
  }//ngOnInit

  salir() {
    console.trace('NavbarComponent click boton Cerrar Sesión');
    const mensaje = '¿ Esta seguro que quiere cerrar la sesión ?';
    if ( confirm(mensaje) ) {
      this.usuarioService.cerrarsesion();
      this.router.navigate(['/']); // ir a Inicio
    }
  }// salir

}
