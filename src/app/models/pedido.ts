import { Cliente } from "./cliente";
import { Ruta } from "./ruta";

// export interface Cliente {
//   clienteID: number;
//   nombre: string;
//   direccion: string;
//   email: string;
//   telefono?: string;
// }

export interface Producto {
  productoID: number;
  nombre: string;
  precio: number;
}

export interface Pedido {
  pedidoID: number;
  cliente: Cliente;
  fechaCreacion: Date;
  fechaEntrega: Date;
  estado: string;
  productos: ProductoPedido[];
  rutas: Ruta[];
}

export interface ProductoPedido {
  productoID: number;
  cantidad: number;
  nombre?: string;
  precio?: number;
}

export interface PedidoCreate {
  clienteID: number;
  fechaEntrega: Date;
  productos: ProductoPedidoCreate[];
}

export interface ProductoPedidoCreate {
  productoID: number;
  cantidad: number;
}

export interface PedidoUpdate {
  fechaEntrega?: Date;
  productos?: ProductoPedidoCreate[];
}