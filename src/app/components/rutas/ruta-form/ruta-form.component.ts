


import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { RutaService } from '../../../services/ruta.service';
import { Ruta, RutaCreate, RutaUpdate } from '../../../models/ruta';

@Component({
  selector: 'app-ruta-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar ruta' : 'Nuevo ruta' }}</h2>
    
    <form [formGroup]="rutaForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre" required>
        </mat-form-field>



        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Fecha Asignacion</mat-label>
          <input matInput formControlName="fechaAsignacion" type="date" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Fecha Estimada Entrega</mat-label>
          <input matInput formControlName="fechaEstimadaEntrega" type="date" required>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button 
          mat-raised-button 
          color="primary" 
          type="submit"
          [disabled]="rutaForm.invalid || isSaving">
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

export class RutaFormComponent {

  private fb = inject(FormBuilder);
    private activeSwal: any = null; // Referencia a la alerta activa

  rutaForm = this.fb.group({
    estado: ['', Validators.required],
    fechaAsignacion: ['', [Validators.required]],
    fechaEstimadaEntrega: ['', Validators.required]
  });

  constructor(

    private rutaService: RutaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RutaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ruta
  ) {
    if (data) {
      this.rutaForm.patchValue({
        estado: data.estado,
        // fechaAsignacion: data.fechaAsignacion,
        // fechaEstimadaEntrega: data.fechaEstimadaEntrega
  
      });
    }
  }

  isSaving = false;


  onSubmit(): void {
    if (this.rutaForm.invalid) return;

    this.isSaving = true;
    const rutaData = this.rutaForm.value;

    if (this.data) {
      // Actualizar
      this.rutaService.updateruta(
        this.data.idRuta,
        rutaData as RutaUpdate
      ).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.mostrarExito('ruta actualizado');
        },
        error: (err) => this.mostrarError(err)
      });
    } else {
      // Crear nuevo
      this.rutaService.createruta(
        rutaData as unknown as RutaCreate
      ).subscribe({
        next: () => {
          this.dialogRef.close(true);
          this.mostrarExito('ruta creado');
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
