import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidosService } from '../../core/services/pedidos.service';
import { FormularioRegistroService } from '../../core/services/formulario-registro.service';
import { Cliente, Producto } from '../../core/interfaces/formulario.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-formulario-registro-pedidos',
  templateUrl: './formulario-registro-pedidos.component.html',
  styleUrls: ['./formulario-registro-pedidos.component.scss']
})
export class FormularioRegistroPedidosComponent implements OnInit {
  pedidoForm: FormGroup;
  clientes: Cliente[] = [];
  productosDisponibles: Producto[] = [];
  loading = false;
  minDate!: Date;
  @ViewChild(HomeComponent) homeComponent!: HomeComponent;


  constructor(
    private fb: FormBuilder,
    private pedidosService: PedidosService,
    private formularioRegistroService: FormularioRegistroService,
    private snackBar: MatSnackBar,
    private router: Router // Inyectar Router
  ) {
    this.pedidoForm = this.createForm();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1); // Fecha mínima: mañana
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadProductos();
  }

  createForm(): FormGroup {
    return this.fb.group({
      clienteId: ['', Validators.required],
      fechaEntrega: ['', [Validators.required]],
      productos: this.fb.array([this.createProductoFormGroup()], Validators.minLength(1)),
      observaciones: ['']
    });
  }

  createProductoFormGroup(): FormGroup {
    return this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get productosArray(): FormArray {
    return this.pedidoForm.get('productos') as FormArray;
  }

  loadClientes(): void {
    this.loading = true;
    // this.clientes = [
    //   {
    //     "idCliente": 1,
    //     "nombre": "Juan Pérez",
    //     "email": "juan.perez@mail.com",
    //     "direccion": "Calle 123 #45-67, Bogotá"
    //   },
    //   {
    //     "idCliente": 2,
    //     "nombre": "María Gómez",
    //     "email": "maria.gomez@correo.co",
    //     "direccion": "Avenida Siempre Viva 742, Medellín"
    //   },
    //   {
    //     "idCliente": 3,
    //     "nombre": "Carlos Rodríguez",
    //     "email": "carlos.rod@example.com",
    //     "direccion": "Carrera 7 #22-33, Cali"
    //   },
    //   {
    //     "idCliente": 4,
    //     "nombre": "Ana López",
    //     "email": "ana.lopez@mail.co",
    //     "direccion": "Diagonal 25 #40-15, Barranquilla"
    //   },
    //   {
    //     "idCliente": 5,
    //     "nombre": "Pedro Martínez",
    //     "email": "pedro.mart@correo.com",
    //     "direccion": "Calle 100 #11-20, Cartagena"
    //   },
    //   {
    //     "idCliente": 6,
    //     "nombre": "Luisa Fernández",
    //     "email": "luisa.fern@mail.com",
    //     "direccion": "Carrera 15 #32-10, Bucaramanga"
    //   },
    //   {
    //     "idCliente": 7,
    //     "nombre": "Jorge Ramírez",
    //     "email": "jorge.ram@example.co",
    //     "direccion": "Avenida 6N #23-45, Pereira"
    //   },
    //   {
    //     "idCliente": 8,
    //     "nombre": "Sofía Herrera",
    //     "email": "sofia.herr@correo.com",
    //     "direccion": "Calle 34 #5-67, Manizales"
    //   },
    //   {
    //     "idCliente": 9,
    //     "nombre": "Miguel Castro",
    //     "email": "miguel.cast@mail.com",
    //     "direccion": "Carrera 50 #30-21, Ibagué"
    //   },
    //   {
    //     "idCliente": 10,
    //     "nombre": "Laura Vargas",
    //     "email": "laura.varg@example.co",
    //     "direccion": "Transversal 8 #17-34, Neiva"
    //   }
    // ]
    this.formularioRegistroService.getClientes().subscribe({
      next: (clientes: any) => {
        this.clientes = clientes;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showError('Error al cargar clientes');
      }
    });
    this.loading = false;
  }

  loadProductos(): void {
    this.loading = true;
    // this.productosDisponibles = [
    //   {
    //     "idProducto": 1,
    //     "nombre": "Laptop Gamer Pro",
    //     "sku": "LP-1001",
    //     "precio": 3500000
    //   },
    //   {
    //     "idProducto": 2,
    //     "nombre": "Smartphone X10",
    //     "sku": "SP-2002",
    //     "precio": 1200000
    //   },
    //   {
    //     "idProducto": 3,
    //     "nombre": "Tablet S8 Ultra",
    //     "sku": "TB-3003",
    //     "precio": 1800000
    //   },
    //   {
    //     "idProducto": 4,
    //     "nombre": "Monitor Curvo 32\"",
    //     "sku": "MN-4004",
    //     "precio": 2100000
    //   },
    //   {
    //     "idProducto": 5,
    //     "nombre": "Teclado Mecánico RGB",
    //     "sku": "TC-5005",
    //     "precio": 450000
    //   },
    //   {
    //     "idProducto": 6,
    //     "nombre": "Mouse Inalámbrico",
    //     "sku": "MS-6006",
    //     "precio": 250000
    //   },
    //   {
    //     "idProducto": 7,
    //     "nombre": "Impresora Multifuncional",
    //     "sku": "IM-7007",
    //     "precio": 850000
    //   },
    //   {
    //     "idProducto": 8,
    //     "nombre": "Disco Duro Externo 2TB",
    //     "sku": "DD-8008",
    //     "precio": 350000
    //   },
    //   {
    //     "idProducto": 9,
    //     "nombre": "Router WiFi 6",
    //     "sku": "RT-9009",
    //     "precio": 650000
    //   },
    //   {
    //     "idProducto": 10,
    //     "nombre": "Cámara Web 4K",
    //     "sku": "CW-1010",
    //     "precio": 500000
    //   }
    // ]

    this.formularioRegistroService.getProductos().subscribe({
      next: (productos: any) => {
        this.productosDisponibles = productos;
      },
      error: () => {
        this.showError('Error al cargar productos');
      }
    });
  }

  addProducto(): void {
    this.productosArray.push(this.createProductoFormGroup());
  }

  removeProducto(index: number): void {
    if (this.productosArray.length > 1) {
      this.productosArray.removeAt(index);
    } else {
      this.showError('Debe haber al menos un producto');
    }
  }

  // onSubmit(): void {
  //   if (this.pedidoForm.invalid) {
  //     this.pedidoForm.markAllAsTouched();
  //     this.showError('Por favor complete todos los campos requeridos');
  //     return;
  //   }

  //   this.loading = true;
  //   const pedidoData = this.preparePedidoData();

  //   this.formularioRegistroService.crearPedido(pedidoData).subscribe({
  //     next: () => {
  //       this.showSuccess('Pedido registrado exitosamente');
  //       this.pedidoForm.reset();
  //       this.productosArray.clear();
  //       this.productosArray.push(this.createProductoFormGroup());
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.showError('Error al registrar el pedido');
  //       this.loading = false;
  //     }
  //   });
  // }

  onSubmit(): void {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      this.showError('Por favor complete todos los campos requeridos');
      return;
    }

    this.loading = true;
    const pedidoData = this.preparePedidoData();

    this.pedidosService.crearPedido(pedidoData).subscribe({
      next: (response) => {
        this.showSuccess('Pedido registrado exitosamente');

        setTimeout(() => {
          this.router.navigate(['/vista-listado-pedidos']); // Cambia '/pedidos' por tu ruta real
          //  this.router.navigate(['/']); // Cambia '/pedidos' por tu ruta real
        }, 500);

      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.showError(error.error?.message || 'Error al registrar el pedido');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // preparePedidoData(): any {
  //   const formValue = this.pedidoForm.value;
  //   return {
  //     clienteId: formValue.clienteId,
  //     fechaEntrega: formValue.fechaEntrega,
  //     productos: formValue.productos,
  //     observaciones: formValue.observaciones
  //   };
  // }

  preparePedidoData(): any {
    const formValue = this.pedidoForm.value;
    const clienteSeleccionado = this.clientes.find(c => c.idCliente === formValue.clienteId);

    return {
      idCliente: formValue.clienteId,
      cliente: clienteSeleccionado ? clienteSeleccionado.nombre : '',
      emailCliente: clienteSeleccionado ? clienteSeleccionado.email : '',
      direccionEntrega: clienteSeleccionado ? clienteSeleccionado.direccion : '',
      fechaEntrega: formValue.fechaEntrega,
      productos: formValue.productos.map((p: any) => {
        const producto = this.productosDisponibles.find(prod => prod.idProducto === p.productoId);
        return {
          idProducto: p.productoId,
          nombre: producto ? producto.nombre : '',
          sku: producto ? producto.sku : '',
          cantidad: p.cantidad,
          precioUnitario: producto ? producto.precio : 0
        };
      }),
      observaciones: formValue.observaciones,
      estado: 'PENDIENTE', // Estado inicial
      fechaCreacion: new Date().toISOString()
    };
  }

  resetForm(): void {
    this.pedidoForm.reset();
    this.productosArray.clear();
    this.productosArray.push(this.createProductoFormGroup());
    this.loading = false;
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  getClienteSeleccionado(): Cliente | undefined {
    const clienteId = this.pedidoForm.get('clienteId')?.value;
    return this.clientes.find(c => c.idCliente === clienteId);
  }

  getProductoNombre(productoId: number): string {
    const producto = this.productosDisponibles.find(p => p.idProducto === productoId);
    return producto ? `${producto.nombre} (${producto.sku})` : 'Producto no encontrado';
  }

  calcularTotal(): number {
    let total = 0;
    const productos = this.pedidoForm.get('productos')?.value;

    if (productos) {
      productos.forEach((item: any) => {
        const producto = this.productosDisponibles.find(p => p.idProducto === item.productoId);
        if (producto) {
          total += producto?.precio ?? 0 * item.cantidad;
        }
      });
    }

    return total;
  }

}