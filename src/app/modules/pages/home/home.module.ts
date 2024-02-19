import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../shared/material.module';

// Components
import { ConfirmationModal } from "../../core/modals/confirmation/confirmation.modal";


@NgModule({
  declarations: [
    HomeComponent,
    ConfirmationModal
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    NgSelectModule
  ]
})
export class HomeModule { }
