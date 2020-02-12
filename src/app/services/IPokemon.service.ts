import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

export interface IPokemonService {

    listar(): Observable<Array<Pokemon>>;
    
    detalle( id: number ): Observable<Pokemon>;
}