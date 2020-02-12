import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor( private router: Router,
               private builder: FormBuilder,
               private usuarioService: UsuarioService
             ) {

    console.trace('LoginComponent constructor');

    // construir formulario
    this.formulario = this.builder.group({

       // definir los FormControl == inputs [ value, validaciones ]
      nombre : ['admin', [Validators.required, Validators.minLength(2), Validators.maxLength(7) ]],
      pass: ['admin', [Validators.required, Validators.minLength(2), Validators.maxLength(7) ]]

    });


  }// constructor

  ngOnInit() {
      console.trace('LoginComponent ngOnInit');

  }// ngOnInit


  enviar( values: any ) {
    console.trace('Submit formulario %o', values);

    const nombre = values.nombre;
    const password = values.pass;
    const uLogeado = this.usuarioService.login(nombre, password);

    if ( uLogeado ) {
      console.trace('Usuario logeado con exito %o', uLogeado);
      this.router.navigate(['privado']);
    } else {
      console.warn('Usuario NO logeado');
      // TODO cambiar alert
      alert('Por favor prueba de nuevo a logearte');
    }

  }//enviar

}
