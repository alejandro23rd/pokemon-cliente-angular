import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {

  }

  getAllPokemon(): Observable<any>{
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);

  }//getAll

  eliminarPokemon(id: number): Observable<Pokemon> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    console.debug('DELETE %s', url);
    return this.http.delete<Pokemon>(url);

  }// eliminar

  crearPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.debug('POST %s pokemon %o', url, pokemon);
    return this.http.post<Pokemon>(url, pokemon);
  }

  modificarPokemon(pokemon: Pokemon): Observable<Pokemon> {

    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${pokemon.id}`;
    console.debug('PUT %s pokemon %o', url, pokemon);
    return this.http.put<Pokemon>(url, pokemon);

  }// modificar

}
