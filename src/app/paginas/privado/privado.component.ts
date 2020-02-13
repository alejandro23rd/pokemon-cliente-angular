import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.scss']
})
export class PrivadoComponent implements OnInit {

  pokemon: Array<Pokemon>;

  constructor(private servicioPokemon : PokemonService) {
    console.trace('PrivadoComponent constructor');
    this.pokemon= [];
  }//constructor

  ngOnInit() {
    console.trace('PrivadoComponent ngOnInit');
    this.cargarTareas();
  }//ngOnInit

  
  private cargarTareas(): void {
    console.trace('cargarTareas');

    // llamar al service para obtener tareas
    this.servicioPokemon.getAll().subscribe(
      datos => {
        console.debug('esto se ejecuta de forma asincrona');
        this.pokemon = datos;
      },
      error => {
        console.warn('Servico Rest no funciona %o', error);
      });

  }// cargarTareas

}
