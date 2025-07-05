// models/pedido.model.ts

export interface Cliente {
  idCliente: number;
  nombre: string;
  email: string;
  direccion: string | null;
}

export interface ProductoPedido {
  idProducto: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Ruta {
  // Definir propiedades según lo que contenga el arreglo de rutas
  // Ejemplo básico:
  idRuta?: number;
  nombreRuta?: string;
  estadoRuta?: string;
  fechaAsignacion?: string;
}

export interface Pedido {
  idPedido: number;
  cliente: Cliente;
  fechaCreacion: string; // o puedes usar Date si haces la transformación
  fechaEntrega: string;  // o puedes usar Date si haces la transformación
  estado: 'Pendiente' | 'Asignado' | 'EnTránsito' | 'Entregado' | 'Cancelado' | string;
  productos: ProductoPedido[];
  rutas: Ruta[];
}

// Opcional: Interface para la respuesta paginada
export interface PaginatedPedidos {
  data: Pedido[];
  totalCount: number;
  page: number;
  pageSize: number;
}