import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IcareChartComponent } from './icare-chart/icare-chart.component';

const routes: Routes = [
  {
    path: '',
    component: IcareChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IcareRoutingModule {}
