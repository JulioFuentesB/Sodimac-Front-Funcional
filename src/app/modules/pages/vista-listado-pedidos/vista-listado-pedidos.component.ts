import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PedidosService } from '../../core/services/pedidos.service';
import { Pedido } from '../../core/interfaces/listado-pedidos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-listado-pedidos',
  templateUrl: './vista-listado-pedidos.component.html',
  styleUrls: ['./vista-listado-pedidos.component.scss']
})
export class VistaListadoPedidosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idPedido', 'cliente', 'productos', 'fechaEntrega', 'estado', 'acciones'];
  estadosDisponibles = ['Pendiente', 'Asignado', 'EnTránsito', 'Entregado', 'Cancelado'];
  dataSource!: MatTableDataSource<Pedido>;
  loading = true;

  searchControl = new FormControl();
  estadoFilter = new FormControl('todos');

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pedidoService: PedidosService,
    private dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loadPedidos();
    this.setupFilters();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  private setupFilters(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(filterValue => {
        this.applyFilter();
      });

    this.estadoFilter.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  private applyFilter(): void {
    const filterValue = this.searchControl.value?.toLowerCase() || '';
    const estadoValue = this.estadoFilter.value;
    
    this.dataSource.filterPredicate = (data: Pedido, filter: string) => {
      const matchesSearch = 
        data.idPedido.toString().includes(filterValue) ||
        data.cliente.nombre.toLowerCase().includes(filterValue) ||
        data.cliente.email.toLowerCase().includes(filterValue) ||
        data.productos.some(p => p.nombre.toLowerCase().includes(filterValue));
      
      const matchesEstado = estadoValue === 'todos' || 
                          data.estado.toLowerCase() === estadoValue!.toLowerCase();
      
      return matchesSearch && matchesEstado;
    };
    
    this.dataSource.filter = 'trigger filter';
  }

  loadPedidos(): void {
    this.loading = true;
    
    this.pedidoService.getPedidosPaginados(1, 100, '', '').subscribe({
      next: (response: any) => {
        // Ordenar por ID de pedido descendente
        const sortedData = response.sort((a: Pedido, b: Pedido) => b.idPedido - a.idPedido);
        this.dataSource = new MatTableDataSource(sortedData);
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (e) => {
        console.log('Error al cargar los pedidos' + e);
        this.loading = false;
      }
    });
  }

  verDetalle(pedido: Pedido): void {
    // Implementar si es necesario
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

  calcularTotal(pedido: Pedido): number {
    return pedido.productos.reduce((total, producto) =>
      total + (producto.precio * producto.cantidad), 0);
  }

  editarPedido(id: number): void {
    this.router.navigate(['/editar-pedido', id]);
  }
}