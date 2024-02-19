import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { DataService } from "./data.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService extends DataService {

  // constructor(
  //   http: HttpClient,
  //   storageService: StorageService
  // ) {
  //   super(http, storageService);
  // }

  // Place your preload data here

  // public fetchCatalogs() {
  //   const tipoPalletsUrl        = `${environment.customApi.calculoTIHIApi}/TipoPallet/GetAll`;
  //   const allocTypesUrl         = `${environment.customApi.consultaWMSApi}/ConsultasWMS/ConsultarTipoAsignacionOla?facility=980`;
  //   forkJoin([
  //     this.getGenericoIntranetCustomApi<Response>(tipoPalletsUrl),
  //     this.getGenericoIntranetCustomApi<Response>(allocTypesUrl),
  //   ]).subscribe({
  //     next: ([tipoPallets, allocTypes]) => {
  //       this.state.setState({
  //         tipoPallets:          tipoPallets?.result?.value        as TipoPallet[],
  //         allocTypes:           allocTypes?.result                as AllocType[],
  //       });
  //     },
  //     error: () => {
  //       this.toast.error('Error al cargar los catálogos', 'Error');
  //     }
  //   });
  // }
}
