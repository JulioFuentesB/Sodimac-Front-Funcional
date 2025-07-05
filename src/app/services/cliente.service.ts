// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Cliente } from '../models/pedido';
// import { ClienteCreate, ClienteUpdate } from '../models/cliente';


// @Injectable({ providedIn: 'root' })
// export class ClienteService {
//   private apiUrl = 'https://localhost:7209/api/Clientes';

//   constructor(private http: HttpClient) {}

//   getClientes(): Observable<Cliente[]> {
//     return this.http.get<Cliente[]>(this.apiUrl);
//   }

//   getCliente(id: number): Observable<Cliente> {
//     return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
//   }

//   createCliente(cliente: ClienteCreate): Observable<Cliente> {
//     return this.http.post<Cliente>(this.apiUrl, cliente);
//   }

//   updateCliente(id: number, cliente: ClienteUpdate): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, cliente);
//   }

//   deleteCliente(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }

// import { inject, Injectable } from '@angular/core';
// import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

// import { Observable, catchError, of } from 'rxjs';
// import { Cliente } from '../models/cliente';
// import { environment } from '../../environment/environment.development';


// @Injectable({
//   providedIn: 'root'
// })
// export class ClienteService {

//   // Inyectamos el HttpClient para realizar las peticiones HTTP
//   constructor() { }

//   private http = inject(HttpClient);
//   private urlBase = environment.apiURL + '/Clientes';

//   getClientes(): Observable<Cliente[]> {
//     debugger;
//     return this.http.get<Cliente[]>(this.urlBase).pipe(
//      catchError(error => {
//       debugger;
//        console.error('Error al obtener clientes, usando datos dummy', error);
//         return of(this.getDummyData());
//       })
//     );
//   }

//   // getClientes(): Observable<Cliente[]> {
//   //   return this.http.get<Cliente[]>(this.urlBase);
//   // }

//  private getDummyData(): Cliente[] { 
//   return [
//     { 
//       idCliente: 1, 
//       nombre: 'Juan Pérez', 
//       direccion: 'Av. Principal 123', 
//       email: 'juan.perez@email.com', 
//       telefono: '3001234567', 
//     },
//     { 
//       idCliente: 2, 
//       nombre: 'María Gómez', 
//       direccion: 'Calle Secundaria 456', 
//       email: 'maria.gomez@email.com', 
//       telefono: '3102345678', 
//     },
//     { 
//       idCliente: 3, 
//       nombre: 'Carlos Rodríguez', 
//       direccion: 'Boulevard Central 789', 
//       email: 'carlos.rodriguez@email.com', 
//       telefono: '3203456789', 
//     },
//     { 
//       idCliente: 4, 
//       nombre: 'Ana Martínez', 
//       direccion: 'Plaza Mayor 101', 
//       email: 'ana.martinez@email.com', 
//       telefono: '3004567890', 
//     },
//     { 
//       idCliente: 5, 
//       nombre: 'Pedro Sánchez', 
//       direccion: 'Avenida Comercial 202', 
//       email: 'pedro.sanchez@email.com', 
//       telefono: '3105678901', 
//     }
//   ];
// }

// }

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteCreate, ClienteUpdate } from '../models/cliente';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Clientes';

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlBase);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlBase}/${id}`);
  }

  createCliente(cliente: ClienteCreate): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlBase, cliente);
  }

  updateCliente(id: number, cliente: ClienteUpdate): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}