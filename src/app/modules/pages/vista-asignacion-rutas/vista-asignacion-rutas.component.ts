
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PedidosService } from '../../core/services/pedidos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Actualizar la interfaz con el campo estado
interface PedidoAsignacion {
  idPedido: number;
  clienteNombre: string;
  direccionEntrega: string;
  fechaEntrega: string;
  estado?: string; // Nuevo campo
  selected?: boolean;
}

@Component({
  selector: 'app-vista-asignacion-rutas',
  templateUrl: './vista-asignacion-rutas.component.html',
  styleUrls: ['./vista-asignacion-rutas.component.scss']
})
export class VistaAsignacionRutasComponent implements OnInit {
  displayedColumns: string[] = ['seleccion', 'idPedido', 'cliente', 'fechaEntrega', 'estado'];
  dataSource!: MatTableDataSource<PedidoAsignacion>;
  loading = true;
  allSelected = false;
  selectedCount = 0;

  searchControl = new FormControl();
  ordenFilter = new FormControl('fecha');

  @ViewChild(MatSort) sort!: MatSort;

  data = [   {     "idPedido": 12,     "clienteNombre": "María Gómez",     "direccionEntrega": "Avenida Siempre Viva 742, Medellín",     "fechaEntrega": "2025-07-11T05:00:00"   },   {     "idPedido": 13,     "clienteNombre": "María Gómez",     "direccionEntrega": "Avenida Siempre Viva 742, Medellín",     "fechaEntrega": "2025-07-11T10:00:00"   },   {     "idPedido": 14,     "clienteNombre": "Ana López",     "direccionEntrega": "Diagonal 25 #40-15, Barranquilla",     "fechaEntrega": "2025-07-19T05:00:00"   },   {     "idPedido": 15,     "clienteNombre": "Laura Vargas",     "direccionEntrega": "Transversal 8 #17-34, Neiva",     "fechaEntrega": "2025-07-25T05:00:00"   },   {     "idPedido": 16,     "clienteNombre": "Miguel Castro",     "direccionEntrega": "Carrera 50 #30-21, Ibagué",     "fechaEntrega": "2025-07-20T06:00:00"   },   {     "idPedido": 17,     "clienteNombre": "Juan Pérez",     "direccionEntrega": "Calle 123 #45-67, Bogotá",     "fechaEntrega": "2025-07-18T15:00:00"   },   {     "idPedido": 18,     "clienteNombre": "Laura Vargas",     "direccionEntrega": "Transversal 8 #17-34, Neiva",     "fechaEntrega": "2025-07-31T05:00:00"   },   {     "idPedido": 19,     "clienteNombre": "Laura Vargas",     "direccionEntrega": "Transversal 8 #17-34, Neiva",     "fechaEntrega": "2025-07-31T05:00:00"   },   {     "idPedido": 20,     "clienteNombre": "Laura Vargas",     "direccionEntrega": "Transversal 8 #17-34, Neiva",     "fechaEntrega": "2025-07-31T05:00:00"   },   {     "idPedido": 21,     "clienteNombre": "María Gómez",     "direccionEntrega": "Avenida Siempre Viva 742, Medellín",     "fechaEntrega": "2025-07-11T05:00:00"   },   {     "idPedido": 22,     "clienteNombre": "María Gómez",     "direccionEntrega": "Avenida Siempre Viva 742, Medellín",     "fechaEntrega": "2025-07-19T05:00:00"   },   {     "idPedido": 23,     "clienteNombre": "Ana López",     "direccionEntrega": "Diagonal 25 #40-15, Barranquilla",     "fechaEntrega": "2025-07-19T05:00:00"   },   {     "idPedido": 24,     "clienteNombre": "María Gómez",     "direccionEntrega": "Avenida Siempre Viva 742, Medellín",     "fechaEntrega": "2025-07-18T05:00:00"   },   {     "idPedido": 25,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-18T05:00:00"   },   {     "idPedido": 26,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-18T05:00:00"   },   {     "idPedido": 27,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-18T05:00:00"   },   {     "idPedido": 28,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-15T05:00:00"   },   {     "idPedido": 29,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-18T05:00:00"   },   {     "idPedido": 30,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-17T05:00:00"   },   {     "idPedido": 31,     "clienteNombre": "Carlos Rodríguez",     "direccionEntrega": "Carrera 7 #22-33, Cali",     "fechaEntrega": "2025-07-26T05:00:00"   },   {     "idPedido": 32,     "clienteNombre": "Pedro Martínez",     "direccionEntrega": "Calle 100 #11-20, Cartagena",     "fechaEntrega": "2025-07-11T05:00:00" , "estado":"Pendiente"  } ]

  constructor(
    private pedidoService: PedidosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPedidosPendientes();
    this.setupFilters();
  }

  loadPedidosPendientes(): void {
    this.loading = true;
    this.dataSource = new MatTableDataSource(this.data)
    this.loading = false;
    // this.pedidoService.getPedidosPendientes().subscribe({
    //   next: (response: any) => {
    //     // Agregamos propiedad selected a cada pedido
    //     const pedidos = response.map((pedido: any) => ({
    //       ...pedido,
    //       selected: false,
    //       estado: 'Pendiente' // Valor por defecto
    //     }));

    //     this.dataSource = new MatTableDataSource(pedidos);
    //     this.dataSource.sort = this.sort;
    //     this.applySort();
    //     this.loading = false;
    //   },
    //   error: (e) => {
    //     console.error('Error al cargar pedidos pendientes', e);
    //     this.snackBar.open('Error al cargar pedidos pendientes', 'Cerrar', { duration: 3000 });
    //     this.loading = false;
    //   }
    // });
  }

  private setupFilters(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.applyFilter());

    this.ordenFilter.valueChanges.subscribe(() => this.applySort());
  }

  private applyFilter(): void {
    const filterValue = this.searchControl.value?.toLowerCase() || '';
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: PedidoAsignacion, filter: string) => {
      return data.idPedido.toString().includes(filter) ||
        data.clienteNombre.toLowerCase().includes(filter) ||
        data.direccionEntrega.toLowerCase().includes(filter);
    };
  }

  private applySort(): void {
    if (!this.dataSource) return;

    if (this.ordenFilter.value === 'fecha') {
      this.dataSource.data.sort((a, b) =>
        new Date(a.fechaEntrega).getTime() - new Date(b.fechaEntrega).getTime());
    } else {
      this.dataSource.data.sort((a, b) => b.idPedido - a.idPedido);
    }

    this.dataSource._updateChangeSubscription();
  }

  toggleAllSelection(event: any): void {
    this.allSelected = event.checked;
    this.dataSource.data.forEach(pedido => pedido.selected = this.allSelected);
    this.updateSelectedCount();
  }

  someSelected(): boolean {
    return this.dataSource?.data?.some(p => p.selected) && !this.allSelected;
  }

  updateAllSelected(): void {
    this.allSelected = this.dataSource?.data?.every(p => p.selected);
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    this.selectedCount = this.dataSource?.data?.filter(p => p.selected).length || 0;
  }

  asignarRutas(): void {
    const pedidosSeleccionados = this.dataSource.data
      .filter(p => p.selected)
      .map(p => p.idPedido);

    this.loading = true;
    this.pedidoService.asignarRutas(pedidosSeleccionados).subscribe({
      next: () => {
        this.snackBar.open('Rutas asignadas correctamente', 'Cerrar', { duration: 3000 });
        this.loadPedidosPendientes(); // Recargar lista
      },
      error: (e) => {
        console.error('Error al asignar rutas', e);
        this.snackBar.open('Error al asignar rutas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }


  // Nueva función para reasignar rutas
  reasignarRutas(): void {
    const pedidosSeleccionados = this.dataSource.data
      .filter(p => p.selected)
      .map(p => p.idPedido);

    if (pedidosSeleccionados.length === 0) return;

    this.loading = true;
    this.pedidoService.asignarRutas(pedidosSeleccionados).subscribe({
      next: () => {
        this.snackBar.open('Rutas reasignadas correctamente', 'Cerrar', { duration: 3000 });
        this.loadPedidosPendientes();
      },
      error: (e) => {
        console.error('Error al reasignar rutas', e);
        this.snackBar.open('Error al reasignar rutas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

   getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'estado-pendiente';
      case 'Asignado': return 'estado-asignado';
      case 'EnTránsito': return 'estado-transito';
      case 'Entregado': return 'estado-entregado';
      case 'Cancelado': return 'estado-cancelado';
      default: return '';
    }
  }



}