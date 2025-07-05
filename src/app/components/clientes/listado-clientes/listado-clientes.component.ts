

import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})


export class ListadoClientesComponent implements OnInit {
  clientes: Cliente[] = [];
    cliente: Cliente | undefined;
  isLoading = true;
  displayedColumns: string[] = ['idCliente', 'nombre', 'email', 'telefono', 'direccion', 'acciones'];

  clienteService = inject(ClienteService);
  private dialog = inject(MatDialog);

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.isLoading = true;
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.mostrarError('Error al cargar clientes: ' + err.message);
        this.isLoading = false;
      }
    });
  }

  abrirFormulario(cliente?: Cliente): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '600px',
      data: cliente ? { ...cliente } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarClientes();
    });
  }

  // eliminarCliente(id: number): void {
  //   if (confirm('¿Está seguro de eliminar este cliente?')) {
  //     this.clienteService.deleteCliente(id).subscribe({
  //       next: () => {
  //         this.clientes = this.clientes.filter(c => c.idCliente !== id);
  //         this.mostrarExito(`Cliente eliminado`);
  //       },
  //       error: (err) => {
  //         this.mostrarError('Error al eliminar cliente: ' + err.message);
  //       }
  //     });
  //   }
  // }



eliminarCliente(id: number): void {
  Swal.fire({
    title: '¿Está seguro de eliminar este cliente? 😟',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.idCliente !== id);
          Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar cliente',
            text: err.message
          });
        }
      });
    }
  });
}


  // private mostrarExito(mensaje: string): void {
  //   this.snackBar.open(mensaje, 'Cerrar', {
  //     duration: 3000,
  //     panelClass: ['success-snackbar']
  //   });
  // }

  // private mostrarError(mensaje: string): void {
  //   this.snackBar.open(mensaje, 'Cerrar', {
  //     duration: 5000,
  //     panelClass: ['error-snackbar']
  //   });
  // }

  private mostrarExito(mensaje: string): void {

    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: mensaje,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });

  }

  private mostrarError(mensaje: string): void {
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3f51b5'
      });
  }
  
  // private mostrarExito(mensaje: string): void {
  //     this.isSaving = false;
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Éxito',
  //       text: mensaje,
  //       timer: 3000,
  //       timerProgressBar: true,
  //       showConfirmButton: false
  //     });
  //   }
  
  //   private mostrarError(error: any): void {
  //     this.isSaving = false;
  //     const mensaje = error.error?.message || 'Error en la operación';
      
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: mensaje,
  //       confirmButtonText: 'Entendido',
  //       confirmButtonColor: '#3f51b5'
  //     });
  //   }



}