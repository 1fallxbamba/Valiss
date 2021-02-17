import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestvalissPage } from './requestvaliss.page';

const routes: Routes = [
  {
    path: '',
    component: RequestvalissPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestvalissPageRoutingModule {}
