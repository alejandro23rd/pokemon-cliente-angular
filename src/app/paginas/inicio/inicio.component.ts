import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  constructor(private pokemonService: PokemonService) {
    console.trace('PokemonRestComponent constructor');

  }//constructor

  ngOnInit(){
    console.trace('PokemonRestComponent ngOnInit');

  }//ngOnInit


}
