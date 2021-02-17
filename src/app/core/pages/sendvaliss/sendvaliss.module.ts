import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendvalissPageRoutingModule } from './sendvaliss-routing.module';

import { SendvalissPage } from './sendvaliss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendvalissPageRoutingModule
  ],
  declarations: [SendvalissPage]
})
export class SendvalissPageModule {}
