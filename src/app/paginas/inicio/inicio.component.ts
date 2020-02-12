import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  pokemon: Array<Pokemon>;

  constructor(private pokemonService: PokemonService) {

    console.trace('PokemonRestComponent constructor');
    this.pokemon = [];

    console.debug(this.pokemon);

  }

  ngOnInit()
  {
    console.trace('PokemonRestComponent ngOnInit');

    this.pokemonService.getAll().subscribe(data => {
    this.pokemon = data;
    })

  }//ngOnInit

}
