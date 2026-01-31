import { Routes } from '@angular/router';
import { introGuard } from './core/guards/intro-guard';
import { homeGuard } from './core/guards/home-guard';

export const routes: Routes = [
  {
    path:'menu',
    loadComponent: () => import('./menu/menu.page').then((m) => m.MenuPage),
    children:[
    {  path: 'home',
      loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      canActivate:[introGuard,homeGuard]
    }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage),
    canActivate:[introGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate:[homeGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage),
    canActivate:[homeGuard]
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
];
