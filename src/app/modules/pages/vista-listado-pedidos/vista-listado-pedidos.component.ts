import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// import { DetallePedidoDialogComponent } from './detalle-pedido-dialog/detalle-pedido-dialog.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PedidosService } from '../../core/services/pedidos.service';
import { Pedido } from '../../core/interfaces/listado-pedidos.model';

@Component({
  selector: 'app-vista-listado-pedidos',
  templateUrl: './vista-listado-pedidos.component.html',
  styleUrls: ['./vista-listado-pedidos.component.scss']
})
export class VistaListadoPedidosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idPedido', 'cliente', 'productos', 'fechaEntrega', 'estado'];
  estadosDisponibles = ['Pendiente', 'Asignado', 'EnTránsito', 'Entregado', 'Cancelado'];
  dataSource!: MatTableDataSource<Pedido>;
  loading = true;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  searchControl = new FormControl();
  estadoFilter = new FormControl('todos');


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private pedidoService: PedidosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPedidos();
    this.setupFilters();
  }


  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }



  private createFilter(): (data: Pedido, filter: string) => boolean {
    return (data, filter) => {
      const searchStr = this.searchControl.value?.toLowerCase() || '';
      const estadoFilter = this.estadoFilter.value;

      // Filtro por estado
      if (estadoFilter !== 'todos' && data.estado.toLowerCase() !== estadoFilter?.toLowerCase()) {
        return false;
      }

      // Filtro de búsqueda
      return (
        data.idPedido.toString().includes(searchStr) ||
        data.cliente.nombre.toLowerCase().includes(searchStr) ||
        data.cliente.email.toLowerCase().includes(searchStr) ||
        data.productos.some(p => p.nombre.toLowerCase().includes(searchStr))
      );
    };
  }

  private setupFilters(): void {
    // Filtro de búsqueda
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(filterValue => {
        this.applyFilter(filterValue);
      });

    // Filtro por estado
    this.estadoFilter.valueChanges.subscribe((estado: any) => {
      this.applyEstadoFilter(estado);
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    // Si usas paginación
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private applyEstadoFilter(estado: string): void {
    if (estado === 'todos') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = estado.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadPedidos(): void {
    this.loading = true;
    const searchTerm = this.searchControl.value || '';
    const estado = this.estadoFilter.value !== 'todos' ? this.estadoFilter.value : '';
    //this.dataSource = new MatTableDataSource<Pedido>([{ "idPedido": 1, "cliente": { "idCliente": 1, "nombre": "Juan Pérez", "email": "juan.perez@mail.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-08T12:17:06.697", "estado": "Pendiente", "productos": [{ "idProducto": 3, "nombre": "Tablet S8 Ultra", "cantidad": 2, "precio": 1800000 }, { "idProducto": 5, "nombre": "Teclado Mecánico RGB", "cantidad": 1, "precio": 450000 }], "rutas": [] }, { "idPedido": 2, "cliente": { "idCliente": 3, "nombre": "Carlos Rodríguez", "email": "carlos.rod@example.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-07T12:17:06.697", "estado": "Asignado", "productos": [{ "idProducto": 1, "nombre": "Laptop Gamer Pro", "cantidad": 1, "precio": 3500000 }, { "idProducto": 10, "nombre": "Cámara Web 4K", "cantidad": 3, "precio": 500000 }], "rutas": [] }, { "idPedido": 3, "cliente": { "idCliente": 5, "nombre": "Pedro Martínez", "email": "pedro.mart@correo.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-10T12:17:06.697", "estado": "EnTránsito", "productos": [{ "idProducto": 2, "nombre": "Smartphone X10", "cantidad": 4, "precio": 1200000 }, { "idProducto": 7, "nombre": "Impresora Multifuncional", "cantidad": 1, "precio": 850000 }], "rutas": [] }, { "idPedido": 4, "cliente": { "idCliente": 2, "nombre": "María Gómez", "email": "maria.gomez@correo.co", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-06T12:17:06.697", "estado": "Entregado", "productos": [{ "idProducto": 4, "nombre": "Monitor Curvo 32\"", "cantidad": 2, "precio": 2100000 }, { "idProducto": 6, "nombre": "Mouse Inalámbrico", "cantidad": 2, "precio": 250000 }], "rutas": [] }, { "idPedido": 5, "cliente": { "idCliente": 4, "nombre": "Ana López", "email": "ana.lopez@mail.co", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-09T12:17:06.697", "estado": "Cancelado", "productos": [{ "idProducto": 8, "nombre": "Disco Duro Externo 2TB", "cantidad": 1, "precio": 350000 }, { "idProducto": 9, "nombre": "Router WiFi 6", "cantidad": 1, "precio": 650000 }], "rutas": [] }, { "idPedido": 6, "cliente": { "idCliente": 7, "nombre": "Jorge Ramírez", "email": "jorge.ram@example.co", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-08T12:17:06.697", "estado": "Pendiente", "productos": [{ "idProducto": 3, "nombre": "Tablet S8 Ultra", "cantidad": 1, "precio": 1800000 }, { "idProducto": 4, "nombre": "Monitor Curvo 32\"", "cantidad": 1, "precio": 2100000 }], "rutas": [] }, { "idPedido": 7, "cliente": { "idCliente": 9, "nombre": "Miguel Castro", "email": "miguel.cast@mail.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-07T12:17:06.697", "estado": "Asignado", "productos": [{ "idProducto": 5, "nombre": "Teclado Mecánico RGB", "cantidad": 2, "precio": 450000 }, { "idProducto": 6, "nombre": "Mouse Inalámbrico", "cantidad": 3, "precio": 250000 }], "rutas": [] }, { "idPedido": 8, "cliente": { "idCliente": 6, "nombre": "Luisa Fernández", "email": "luisa.fern@mail.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-11T12:17:06.697", "estado": "EnTránsito", "productos": [{ "idProducto": 7, "nombre": "Impresora Multifuncional", "cantidad": 1, "precio": 850000 }, { "idProducto": 8, "nombre": "Disco Duro Externo 2TB", "cantidad": 2, "precio": 350000 }], "rutas": [] }, { "idPedido": 9, "cliente": { "idCliente": 8, "nombre": "Sofía Herrera", "email": "sofia.herr@correo.com", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-06T12:17:06.697", "estado": "Entregado", "productos": [{ "idProducto": 9, "nombre": "Router WiFi 6", "cantidad": 1, "precio": 650000 }, { "idProducto": 10, "nombre": "Cámara Web 4K", "cantidad": 1, "precio": 500000 }], "rutas": [] }, { "idPedido": 10, "cliente": { "idCliente": 10, "nombre": "Laura Vargas", "email": "laura.varg@example.co", "direccion": null }, "fechaCreacion": "2025-07-05T12:17:06.697", "fechaEntrega": "2025-07-08T12:17:06.697", "estado": "Cancelado", "productos": [{ "idProducto": 1, "nombre": "Laptop Gamer Pro", "cantidad": 1, "precio": 3500000 }, { "idProducto": 2, "nombre": "Smartphone X10", "cantidad": 1, "precio": 1200000 }], "rutas": [] }]);
    //this.dataSource = new MatTableDataSource<Pedido>();

    this.pedidoService.getPedidosPaginados(this.currentPage + 1, this.pageSize, searchTerm, estado!).subscribe({
      next: (response: any) => {

        this.dataSource = new MatTableDataSource(response);
        this.totalItems = response.length; // Ajusta según la estructura de tu respuesta
        this.loading = false;

      },
      error: (e) => {
        //capturar error
        console.log('Error al cargar los pedidos' + e);
        this.loading = false;
      }
    })

    // ).subscribe((response:any) => {
    //   this.dataSource = new MatTableDataSource(response.data);
    //   this.totalItems = response.totalCount;
    //   this.loading = false;
    // }, () => {
    //   this.loading = false;
    // });

    this.loading = false;
    this.dataSource.filterPredicate = this.createFilter();
    this.totalItems = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPedidos();
  }

  verDetalle(pedido: Pedido): void {
    // this.dialog.open(DetallePedidoDialogComponent, {
    //   width: '800px',
    //   data: { pedido }
    // });
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
}