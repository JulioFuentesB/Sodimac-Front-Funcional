
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment.development';
import { Ruta, RutaCreate, RutaUpdate } from '../models/ruta';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/rutas';

  getrutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.urlBase);
  }

  getrutaById(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.urlBase}/${id}`);
  }

  createruta(ruta: RutaCreate): Observable<Ruta> {
    return this.http.post<Ruta>(this.urlBase, ruta);
  }

  updateruta(id: number, ruta: RutaUpdate): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, ruta);
  }

  deleteruta(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}