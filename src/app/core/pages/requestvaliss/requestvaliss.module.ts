import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestvalissPageRoutingModule } from './requestvaliss-routing.module';

import { RequestvalissPage } from './requestvaliss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestvalissPageRoutingModule
  ],
  declarations: [RequestvalissPage]
})
export class RequestvalissPageModule {}
