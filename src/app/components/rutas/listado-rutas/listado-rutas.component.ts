// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-listado-rutas',
//   imports: [],
//   templateUrl: './listado-rutas.component.html',
//   styleUrl: './listado-rutas.component.css'
// })
// export class ListadoRutasComponent {

// }




import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { Ruta } from '../../../models/ruta';
import { RutaService } from '../../../services/ruta.service';
import { RutaFormComponent } from '../ruta-form/ruta-form.component';

@Component({
  selector: 'app-listado-rutas',
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
  templateUrl: './listado-rutas.component.html',
  styleUrls: ['./listado-rutas.component.css']
})


export class ListadoRutasComponent implements OnInit {
  rutas: Ruta[] = [];
    ruta: Ruta | undefined;
  isLoading = true;
  displayedColumns: string[] = ['idRuta','estado', 'fechaAsignacion', 'fechaEstimadaEntrega', 'acciones'];

  rutaService = inject(RutaService);
  private dialog = inject(MatDialog);

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarrutas();
  }

  cargarrutas(): void {
    this.isLoading = true;
    this.rutaService.getrutas().subscribe({
      next: (data) => {
        this.rutas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.mostrarError('Error al cargar rutas: ' + err.message);
        this.isLoading = false;
      }
    });
  }

  abrirFormulario(ruta?: Ruta): void {
    const dialogRef = this.dialog.open(RutaFormComponent, {
      width: '600px',
      data: ruta ? { ...ruta } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.cargarrutas();
    });
  }


eliminarruta(id: number): void {
  Swal.fire({
    title: '¿Está seguro de eliminar este ruta? 😟',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.rutaService.deleteruta(id).subscribe({
        next: () => {
          this.rutas = this.rutas.filter(c => c.idRuta !== id);
          Swal.fire({
            icon: 'success',
            title: 'ruta eliminado',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar ruta',
            text: err.message
          });
        }
      });
    }
  });
}


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



}