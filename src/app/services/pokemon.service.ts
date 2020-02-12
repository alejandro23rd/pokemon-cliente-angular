import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from '../model/pokemon';
import { IPokemonService } from './IPokemon.service';

@Injectable({
providedIn: 'root'
})
export class PokemonService implements IPokemonService {



constructor(private http: HttpClient) {
  console.trace('TareasService constructor');

} // constructor

listar(): Observable <any> {
  const url = 'http://localhost:3000/pokemon';
  console.debug(`GET ${url}`);

  return this.http.get(url);

}//listar


detalle(id: number): Observable < Pokemon> {
    throw new Error("Method not implemented.");
  
}//detalle

} // PokemonService
