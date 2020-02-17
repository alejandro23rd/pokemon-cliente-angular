import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isUndefined } from 'util';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  pokemon: Array<Pokemon>;
  pokemonSeleccionado: any;

  //formulario
  formulario: FormGroup;

  // mensajes
  mensaje: string;
  showMensaje: boolean;

  //crear nuevo pokemon
  nombreNuevo: string;

  constructor(private servicioPokemon : PokemonService, private builder: FormBuilder) {
    console.trace('PrivadoComponent constructor');
    console.debug(this.pokemon);
    this.pokemon = [];
    this.mensaje = '';
    this.formulario = this.builder.group({
      id: new FormControl(0),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });

    this.nombreNuevo = '';

  }//constructor

  ngOnInit() {
    console.trace('PrivadoComponent ngOnInit');
    this.cargarPokemon();
    
  }//ngOnInit


  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon(" + pokemon.id + " " + pokemon.nombre + ")");
    
    this.pokemonSeleccionado = pokemon;
    this.rellenarDatos();
  }// seleccionarReceta
  

  private cargarPokemon(): void {
    console.trace('cargarPokemon');
    // llamar al service para obtener tareas
    this.servicioPokemon.getAllPokemon().subscribe(
      datos => {
        console.debug('esto se ejecuta de forma asincrona');
        this.pokemon = datos;
      },
      error => {
        console.warn('Servico Rest no funciona %o', error);
      });
  }// cargarTareas


  eliminar(pokemon: Pokemon) {
    console.debug('click Liberar %o', pokemon);

    if ( confirm('¿Estas seguro?') ) {
      console.trace('Confirmada la liberacion');
      this.servicioPokemon.eliminarPokemon( pokemon.id ).subscribe( () => {
        this.mensaje = `Has liberado la pokemon con ID [${pokemon.id}] con el titulo: ${pokemon.nombre}`;
        this.showMensaje = true;
        this.cargarPokemon();
      });

    } else {
      console.trace('Cancelada la liberacion');
    }

  }// eliminar

  rellenarDatos() {
    console.debug('click rellenarDatos');

    const controlId = this.formulario.get('id');
    controlId.setValue( this.pokemonSeleccionado.id);
    this.formulario.get('nombre').setValue( this.pokemonSeleccionado.nombre);

  }

  getID(formData){
    console.debug('coge el getID %o', formData);

    if(!this.pokemonSeleccionado){
      this.pokemonSeleccionado = new Pokemon();
      this.pokemonSeleccionado.nombre = formData.nombre;
      this.crear(this.pokemonSeleccionado);

    }else{
      this.pokemonSeleccionado.nombre = formData.nombre;
      this.modificar(this.pokemonSeleccionado);
    }
    
  }//getID

  crear(pokemon : Pokemon){
    console.trace('Entra a crear');

    this.servicioPokemon.crearPokemon(pokemon).subscribe( data => {
    console.debug('Nueva Pokemon creado %o', data);
    this.cargarPokemon();
    this.mensaje = 'Pokemon registrado con Exito!!!';
    this.showMensaje = true;
    });

  }//crear

  modificar(pokemon: Pokemon): void {
    console.debug('loose focus para cambiar nombre %o', pokemon);
    this.servicioPokemon.modificarPokemon(pokemon).subscribe( () => this.cargarPokemon());

  }//modificar

}
