import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../core/services/pedidos.service';

@Component({
  selector: 'app-reporte-entregas',
  templateUrl: './reporte-entregas.component.html',
  styleUrls: ['./reporte-entregas.component.scss']
})
export class ReporteEntregasComponent implements OnInit {
  loading = true;
  reporteData: any;
  
  // Colores para cada estado
  colorMap: { [key: string]: string } = {
    'Pendiente': '#FF9800',     // Naranja
    'Asignado': '#2196F3',      // Azul
    'EnTránsito': '#673AB7',    // Morado
    'Entregado': '#4CAF50',     // Verde
    'Cancelado': '#F44336'      // Rojo
  };

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.loadReporteData();
  }

  // Función para obtener las claves de un objeto
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  loadReporteData(): void {
    this.loading = true;
    // Simulación de datos - reemplazar con llamada real al servicio
    setTimeout(() => {
      this.reporteData = {
        periodo: "2025-01-01 al 2026-01-01",
        totales: {
          "Asignado": { cantidad: 4, porcentaje: 12.9 },
          "Cancelado": { cantidad: 2, porcentaje: 6.45 },
          "EnTránsito": { cantidad: 2, porcentaje: 6.45 },
          "Entregado": { cantidad: 2, porcentaje: 6.45 },
          "Pendiente": { cantidad: 21, porcentaje: 67.74 }
        }
      };
      this.loading = false;
    }, 1000);
    
    // Versión real con servicio:
    // this.pedidosService.getReporteEntregas().subscribe(data => {
    //   this.reporteData = data;
    //   this.loading = false;
    // });
  }

  getCantidadByEstado(estado: string): number {
    return this.reporteData?.totales[estado]?.cantidad || 0;
  }

  getTotalPedidos(): number {
    if (!this.reporteData?.totales) return 0;
    return Object.values(this.reporteData.totales)
      .reduce((total: number, item: any) => total + item.cantidad, 0);
  }

  // Método para el ancho de las barras de porcentaje
  getPercentageWidth(porcentaje: number): string {
    return `${porcentaje}%`;
  }
}