import { Routes } from '@angular/router';

export const routes: Routes = [
 
  {
    path: '',
    loadChildren: () =>
      import('./icare/icare.module').then(m => m.IcareModule),
  },
];
