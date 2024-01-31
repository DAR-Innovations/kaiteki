import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KaizenHomeComponent } from './pages/kaizen-home/kaizen-home.component';

const routes: Routes = [
  {
    path: '',
    component: KaizenHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenRoutingModule {}
