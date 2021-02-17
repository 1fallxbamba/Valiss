import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendvalissPage } from './sendvaliss.page';

const routes: Routes = [
  {
    path: '',
    component: SendvalissPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendvalissPageRoutingModule {}
