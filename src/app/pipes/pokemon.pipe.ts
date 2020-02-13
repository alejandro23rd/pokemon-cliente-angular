import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {

  /**
   * 
   * @param pokemon 
   * @param busqueda 
   */

  transform(pokemon: any, busqueda: string): any {
    
    let resultado = pokemon;

    console.debug('busqueda', busqueda);


    // filtrar el pokemon por nombre
     if ( busqueda && '' !== busqueda) {
        resultado = resultado.filter( (el) => el.nombre.includes(busqueda));

      }//if
    return resultado;
  }//transform
}//PokemonPipe
