// export interface Ruta {
//   rutaID: number;
//   estado: string;
//   fechaAsignacion: Date;
// }

export interface RouteAssignment {
  orderId: number;
  routeId: number;
  estimatedDelivery: Date;
}

export interface RouteAssignmentResponse {
  assignments: RouteAssignment[];
}

export interface RouteStatusResponse {
  routeId: number;
  currentStatus: string;
  lastUpdate: Date;
}

export interface Ruta {
  idRuta: number;
  estado: string;
  fechaAsignacion: Date;
  fechaEstimadaEntrega?: Date;
}

export interface RutaCreate {
   estado: string;
  fechaAsignacion: Date;
  fechaEstimadaEntrega?: Date;
}

export interface RutaUpdate {
  estado?: string;
  fechaEstimadaEntrega?: Date;
}

export interface RouteAssignment {
  orderId: number;
  routeId: number;
  estimatedDelivery: Date;
}

export interface RouteAssignmentResponse {
  assignments: RouteAssignment[];
}

export interface RouteStatusResponse {
  routeId: number;
  currentStatus: string;
  lastUpdate: Date;
}