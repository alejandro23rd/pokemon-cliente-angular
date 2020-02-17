import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(private servicioPokemon : PokemonService, private builder: FormBuilder) {
    console.trace('PrivadoComponent constructor');
    console.debug(this.pokemon);
    this.pokemon = [];
    this.mensaje = '';
    this.formulario = this.builder.group({
      id: new FormControl(0),
      nombre: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });

  }//constructor

  ngOnInit() {
    console.trace('PrivadoComponent ngOnInit');
    this.cargarPokemon();
    
  }//ngOnInit


  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarReceta(" + pokemon.id + " " + pokemon.nombre + ")");
    
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


  enviar(formData){
    console.debug('click en enviar %0', formData);
  }

  rellenarDatos() {
    console.debug('click rellenarDatos');

    const controlId = this.formulario.get('id');
    controlId.setValue( this.pokemonSeleccionado.id);
    this.formulario.get('nombre').setValue( this.pokemonSeleccionado.nombre);

  }
}
