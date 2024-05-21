import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((mod) => mod.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'email',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/email/email.module').then((mod) => mod.EmailModule),
  },

  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/error/error.module').then((mod) => mod.ErrorModule),
  },

  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
