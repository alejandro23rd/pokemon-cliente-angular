import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { Error404Component } from './paginas/error404/error404.component';
import { LoginComponent } from './paginas/login/login.component';
import { PrivadoComponent } from './paginas/privado/privado.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [

    //pagina inicio
    { path: '',  component: InicioComponent},
    
    //resto de paginas
    { path: 'login', component: LoginComponent},

    //pagina privada (BackOffice)
    { path: 'privado', component: PrivadoComponent, canActivate: [LoginGuard]},

    //si no encunetra la url, saca la pagina de error 404
    { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
