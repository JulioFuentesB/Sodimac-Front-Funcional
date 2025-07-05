import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(public http:HttpClient) { }

  getPedidosPaginados(page: number, pageSize: number, searchTerm: string, estado: string) {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString(),
      searchTerm,
      estado
    };
    return this.http.get<any>(`/pedidos`, { params });
  }

}
