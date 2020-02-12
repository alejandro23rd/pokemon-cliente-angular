import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<any>{
    const url = `http://localhost:3000/pokemon`;
    console.trace('PokemonService getPokemon ' + url);
    return this.http.get(url);

  }//getAll
}
