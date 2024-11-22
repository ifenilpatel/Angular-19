import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authetication/authetication.module').then(
        (m) => m.AutheticationModule
      ),
  },
];
