import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http: HttpClient) {

  }

  //para local

  // getAllHabilidad(): Observable<any>{
  //   const url = `http://localhost:8080/pokemon-rest/api/habilidad/`;
  //   console.trace('HabilidadService getHabilidad ' + url);
  //   return this.http.get(url);

  // }

  //para produccion

    getAllHabilidad(): Observable<any>{
    const url = `http://192.168.0.50:8080/alejandro-pokemon-rest/api/habilidad/`;
    console.trace('HabilidadService getHabilidad ' + url);
    return this.http.get(url);

  }

}
