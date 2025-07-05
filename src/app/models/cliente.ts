export interface Cliente {
  idCliente: number;
  nombre: string;
  direccion: string;
  email: string;
  telefono?: string;
}

export interface ClienteCreate {
  nombre: string;
  direccion: string;
  email: string;
  telefono?: string;
}

export interface ClienteUpdate {
  nombre?: string;
  direccion?: string;
  email?: string;
  telefono?: string;
}

