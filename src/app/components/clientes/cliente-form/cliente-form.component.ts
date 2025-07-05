
import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente, ClienteCreate, ClienteUpdate } from '../../../models/cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
    
    <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Teléfono</mat-label>
          <input matInput formControlName="telefono">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Dirección</mat-label>
          <textarea matInput formControlName="direccion" required></textarea>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="clienteForm.invalid || isSaving">
          {{ isSaving ? 'Guardando...' : 'Guardar' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
  `]
})

export class ClienteFormComponent {

  private fb = inject(FormBuilder);
    private activeSwal: any = null; // Referencia a la alerta activa

  clienteForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: ['', Validators.required]
  });

  constructor(

    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    if (data) {
      this.clienteForm.patchValue({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || '',
        direccion: data.direccion
      });
    }
  }

  isSaving = false;


  onSubmit(): void {
    if (this.clienteForm.invalid) return;

    this.isSaving = true;
    const clienteData = this.clienteForm.value;

    if (this.data) {
      // Actualizar
      this.clienteService.updateCliente(
        this.data.idCliente,
        clienteData as ClienteUpdate
      ).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.mostrarExito('Cliente actualizado');
        },
        error: (err) => this.mostrarError(err)
      });
    } else {
      // Crear nuevo
      this.clienteService.createCliente(
        clienteData as ClienteCreate
      ).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.mostrarExito('Cliente creado');
        },
        error: (err) => this.mostrarError(err)
      });
    }
  }

  onCancel(): void {
    debugger;
     // Cerrar SweetAlert2 si está abierto
         Swal.close(); // Cierra el modal de SweetAlert2
    if (this.activeSwal) {
      this.activeSwal.close();
      this.activeSwal = null;
    }
    this.dialogRef.close(false);
  }

  // private mostrarExito(mensaje: string): void {
  //   this.isSaving = false;
  //   this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  // }

  // private mostrarError(error: any): void {
  //   this.isSaving = false;
  //   const mensaje = error.error?.message || 'Error en la operación';
  //   this.snackBar.open(mensaje, 'Cerrar', { duration: 5000 });
  // }

private mostrarExito(mensaje: string): void {
    this.isSaving = false;
    
    // Guardar referencia a la alerta
    this.activeSwal = Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        this.activeSwal = null; // Limpiar referencia al cerrar
      }
    });
  }

  private mostrarError(error: any): void {
    this.isSaving = false;
    const mensaje = error.error?.message || 'Error en la operación';
    
    // Guardar referencia a la alerta
    this.activeSwal = Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3f51b5',
      willClose: () => {
        this.activeSwal = null; // Limpiar referencia al cerrar
      }
    });
  }
}
