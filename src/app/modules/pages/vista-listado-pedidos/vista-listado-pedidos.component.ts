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
  displayedColumns: string[] = ['idPedido', 'cliente', 'productos', 'fechaEntrega', 'estado', 'rutas', 'acciones'];
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
        data.cliente.direccion.toLowerCase().includes(filterValue) ||
        data.productos.some(p => p.nombre.toLowerCase().includes(filterValue));
      
      const matchesEstado = estadoValue === 'todos' || 
                          data.estado.toLowerCase() === estadoValue!.toLowerCase();
      
      return matchesSearch && matchesEstado;
    };
    
    this.dataSource.filter = 'trigger filter';
  }

  loadPedidos(): void {
    this.loading = true;
    
    // Simulación de datos - reemplazar con llamada real al servicio
    const mockData: Pedido[] = [   {     "idPedido": 32,     "cliente": {       "idCliente": 5,       "nombre": "Pedro Martínez",       "email": "pedro.mart@correo.com",       "direccion": "Calle 100 #11-20, Cartagena"     },     "fechaCreacion": "2025-07-06T11:10:16.867",     "fechaEntrega": "2025-07-11T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       }     ],     "rutas": []   },   {     "idPedido": 31,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T11:03:40.977",     "fechaEntrega": "2025-07-26T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 30,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T11:01:27.477",     "fechaEntrega": "2025-07-17T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 29,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T10:55:34.437",     "fechaEntrega": "2025-07-18T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 28,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T10:52:14.237",     "fechaEntrega": "2025-07-15T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 27,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T10:51:35.037",     "fechaEntrega": "2025-07-18T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 26,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T10:51:32.013",     "fechaEntrega": "2025-07-18T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 25,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-06T10:51:17.137",     "fechaEntrega": "2025-07-18T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 24,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-06T10:48:34.607",     "fechaEntrega": "2025-07-18T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 23,     "cliente": {       "idCliente": 4,       "nombre": "Ana López",       "email": "ana.lopez@mail.co",       "direccion": "Diagonal 25 #40-15, Barranquilla"     },     "fechaCreacion": "2025-07-06T10:47:21.923",     "fechaEntrega": "2025-07-19T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 22,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-06T10:46:08.743",     "fechaEntrega": "2025-07-19T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 21,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-06T10:45:10.4",     "fechaEntrega": "2025-07-11T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 20,     "cliente": {       "idCliente": 10,       "nombre": "Laura Vargas",       "email": "laura.varg@example.co",       "direccion": "Transversal 8 #17-34, Neiva"     },     "fechaCreacion": "2025-07-06T10:44:28.973",     "fechaEntrega": "2025-07-31T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       }     ],     "rutas": []   },   {     "idPedido": 19,     "cliente": {       "idCliente": 10,       "nombre": "Laura Vargas",       "email": "laura.varg@example.co",       "direccion": "Transversal 8 #17-34, Neiva"     },     "fechaCreacion": "2025-07-06T10:44:03.793",     "fechaEntrega": "2025-07-31T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       }     ],     "rutas": []   },   {     "idPedido": 18,     "cliente": {       "idCliente": 10,       "nombre": "Laura Vargas",       "email": "laura.varg@example.co",       "direccion": "Transversal 8 #17-34, Neiva"     },     "fechaCreacion": "2025-07-06T10:43:58.61",     "fechaEntrega": "2025-07-31T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       }     ],     "rutas": []   },   {     "idPedido": 17,     "cliente": {       "idCliente": 1,       "nombre": "Juan Pérez",       "email": "juan.perez@mail.com",       "direccion": "Calle 123 #45-67, Bogotá"     },     "fechaCreacion": "2025-07-06T10:32:34.743",     "fechaEntrega": "2025-07-18T15:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       },       {         "idProducto": 5,         "nombre": "Teclado Mecánico RGB",         "cantidad": 2,         "precio": 450000       }     ],     "rutas": []   },   {     "idPedido": 16,     "cliente": {       "idCliente": 9,       "nombre": "Miguel Castro",       "email": "miguel.cast@mail.com",       "direccion": "Carrera 50 #30-21, Ibagué"     },     "fechaCreacion": "2025-07-05T22:26:17.39",     "fechaEntrega": "2025-07-20T06:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       }     ],     "rutas": []   },   {     "idPedido": 15,     "cliente": {       "idCliente": 10,       "nombre": "Laura Vargas",       "email": "laura.varg@example.co",       "direccion": "Transversal 8 #17-34, Neiva"     },     "fechaCreacion": "2025-07-05T22:18:15.87",     "fechaEntrega": "2025-07-25T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 14,     "cliente": {       "idCliente": 4,       "nombre": "Ana López",       "email": "ana.lopez@mail.co",       "direccion": "Diagonal 25 #40-15, Barranquilla"     },     "fechaCreacion": "2025-07-05T22:16:29.78",     "fechaEntrega": "2025-07-19T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 4,         "nombre": "Monitor Curvo 32\"",         "cantidad": 2,         "precio": 2100000       }     ],     "rutas": []   },   {     "idPedido": 13,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-05T22:05:23.887",     "fechaEntrega": "2025-07-11T10:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 12,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-05T22:02:49.96",     "fechaEntrega": "2025-07-11T05:00:00",     "estado": "Pendiente",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 1,         "precio": 1200000       }     ],     "rutas": []   },   {     "idPedido": 1,     "cliente": {       "idCliente": 1,       "nombre": "Juan Pérez",       "email": "juan.perez@mail.com",       "direccion": "Calle 123 #45-67, Bogotá"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-08T17:17:06.697",     "estado": "Asignado",     "productos": [       {         "idProducto": 3,         "nombre": "Tablet S8 Ultra",         "cantidad": 2,         "precio": 1800000       },       {         "idProducto": 5,         "nombre": "Teclado Mecánico RGB",         "cantidad": 1,         "precio": 450000       }     ],     "rutas": [       {         "idRuta": 1,         "estado": "EnTránsito",         "fechaAsignacion": "2025-07-05T12:17:06.727",         "fechaEstimadaEntrega": null       },       {         "idRuta": 13,         "estado": "EnTránsito",         "fechaAsignacion": "2025-07-06T15:09:20.013",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 2,     "cliente": {       "idCliente": 3,       "nombre": "Carlos Rodríguez",       "email": "carlos.rod@example.com",       "direccion": "Carrera 7 #22-33, Cali"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-07T12:17:06.697",     "estado": "Asignado",     "productos": [       {         "idProducto": 1,         "nombre": "Laptop Gamer Pro",         "cantidad": 1,         "precio": 3500000       },       {         "idProducto": 10,         "nombre": "Cámara Web 4K",         "cantidad": 3,         "precio": 500000       }     ],     "rutas": [       {         "idRuta": 2,         "estado": "Reportado",         "fechaAsignacion": "2025-07-05T09:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 3,     "cliente": {       "idCliente": 5,       "nombre": "Pedro Martínez",       "email": "pedro.mart@correo.com",       "direccion": "Calle 100 #11-20, Cartagena"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-10T12:17:06.697",     "estado": "EnTránsito",     "productos": [       {         "idProducto": 2,         "nombre": "Smartphone X10",         "cantidad": 4,         "precio": 1200000       },       {         "idProducto": 7,         "nombre": "Impresora Multifuncional",         "cantidad": 1,         "precio": 850000       }     ],     "rutas": [       {         "idRuta": 3,         "estado": "Novedad",         "fechaAsignacion": "2025-07-04T12:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 4,     "cliente": {       "idCliente": 2,       "nombre": "María Gómez",       "email": "maria.gomez@correo.co",       "direccion": "Avenida Siempre Viva 742, Medellín"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-06T12:17:06.697",     "estado": "Entregado",     "productos": [       {         "idProducto": 4,         "nombre": "Monitor Curvo 32\"",         "cantidad": 2,         "precio": 2100000       },       {         "idProducto": 6,         "nombre": "Mouse Inalámbrico",         "cantidad": 2,         "precio": 250000       }     ],     "rutas": [       {         "idRuta": 4,         "estado": "Entregado",         "fechaAsignacion": "2025-07-03T12:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 5,     "cliente": {       "idCliente": 4,       "nombre": "Ana López",       "email": "ana.lopez@mail.co",       "direccion": "Diagonal 25 #40-15, Barranquilla"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-09T12:17:06.697",     "estado": "Cancelado",     "productos": [       {         "idProducto": 8,         "nombre": "Disco Duro Externo 2TB",         "cantidad": 1,         "precio": 350000       },       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       }     ],     "rutas": [       {         "idRuta": 5,         "estado": "EnTránsito",         "fechaAsignacion": "2025-07-05T07:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 6,     "cliente": {       "idCliente": 7,       "nombre": "Jorge Ramírez",       "email": "jorge.ram@example.co",       "direccion": "Avenida 6N #23-45, Pereira"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-08T22:17:06.697",     "estado": "Asignado",     "productos": [       {         "idProducto": 3,         "nombre": "Tablet S8 Ultra",         "cantidad": 1,         "precio": 1800000       },       {         "idProducto": 4,         "nombre": "Monitor Curvo 32\"",         "cantidad": 1,         "precio": 2100000       }     ],     "rutas": [       {         "idRuta": 6,         "estado": "Reportado",         "fechaAsignacion": "2025-07-04T12:17:06.727",         "fechaEstimadaEntrega": null       },       {         "idRuta": 14,         "estado": "EnTránsito",         "fechaAsignacion": "2025-07-06T15:33:32.9",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 7,     "cliente": {       "idCliente": 9,       "nombre": "Miguel Castro",       "email": "miguel.cast@mail.com",       "direccion": "Carrera 50 #30-21, Ibagué"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-07T12:17:06.697",     "estado": "Asignado",     "productos": [       {         "idProducto": 5,         "nombre": "Teclado Mecánico RGB",         "cantidad": 2,         "precio": 450000       },       {         "idProducto": 6,         "nombre": "Mouse Inalámbrico",         "cantidad": 3,         "precio": 250000       }     ],     "rutas": [       {         "idRuta": 7,         "estado": "Novedad",         "fechaAsignacion": "2025-07-05T12:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 8,     "cliente": {       "idCliente": 6,       "nombre": "Luisa Fernández",       "email": "luisa.fern@mail.com",       "direccion": "Carrera 15 #32-10, Bucaramanga"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-11T12:17:06.697",     "estado": "EnTránsito",     "productos": [       {         "idProducto": 7,         "nombre": "Impresora Multifuncional",         "cantidad": 1,         "precio": 850000       },       {         "idProducto": 8,         "nombre": "Disco Duro Externo 2TB",         "cantidad": 2,         "precio": 350000       }     ],     "rutas": [       {         "idRuta": 8,         "estado": "Entregado",         "fechaAsignacion": "2025-07-05T00:17:06.727",         "fechaEstimadaEntrega": null       }     ]   },   {     "idPedido": 9,     "cliente": {       "idCliente": 8,       "nombre": "Sofía Herrera",       "email": "sofia.herr@correo.com",       "direccion": "Calle 34 #5-67, Manizales"     },     "fechaCreacion": "2025-07-05T12:17:06.697",     "fechaEntrega": "2025-07-06T12:17:06.697",     "estado": "Entregado",     "productos": [       {         "idProducto": 9,         "nombre": "Router WiFi 6",         "cantidad": 1,         "precio": 650000       },       {         "idProducto": 10,         "nombre": "Cámara Web 4K",         "cantidad": 1,         "precio": 500000       }     ],     "rutas": [       {         "idRuta": 9,         "estado": "EnTránsito",         "fechaAsignacion": "2025-07-05T10:17:06.727",         "fechaEstimadaEntrega": null       }     ]   } ]
    
    // Ordenar por ID de pedido descendente
    const sortedData = mockData.sort((a, b) => b.idPedido - a.idPedido);
    this.dataSource = new MatTableDataSource(sortedData);
    this.dataSource.sort = this.sort;
    this.loading = false;

    // Versión real con servicio:
    /*
    this.pedidoService.getPedidos().subscribe({
      next: (response: Pedido[]) => {
        const sortedData = response.sort((a, b) => b.idPedido - a.idPedido);
        this.dataSource = new MatTableDataSource(sortedData);
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los pedidos', error);
        this.loading = false;
      }
    });
    */
  }

  getEstadoColor(estado: string): string {
    switch (estado.toUpperCase()) {
      case 'Pendiente'.toLocaleUpperCase(): return 'estado-pendiente';
      case 'Asignado'.toLocaleUpperCase(): return 'estado-asignado';
      case 'EnTránsito'.toLocaleUpperCase(): return 'estado-transito';
      case 'Entregado'.toLocaleUpperCase(): return 'estado-entregado';
      case 'Cancelado'.toLocaleUpperCase(): return 'estado-cancelado';
      default: return '';
    }
  }

  getRutaColor(estado: string): string {
    switch (estado.toUpperCase()) {
      case 'EnTránsito'.toUpperCase(): return 'ruta-transito';
      case 'Reportado'.toUpperCase(): return 'ruta-reportado';
      case 'Novedad'.toUpperCase(): return 'ruta-novedad';
      case 'Entregado'.toUpperCase(): return 'ruta-entregado';
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

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}