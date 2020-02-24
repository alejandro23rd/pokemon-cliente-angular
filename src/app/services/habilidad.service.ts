import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http: HttpClient) {

  }

  getAllHabilidad(): Observable<any>{
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/`;
    console.trace('HabilidadService getHabilidad ' + url);
    return this.http.get(url);

  }//getAll

}
