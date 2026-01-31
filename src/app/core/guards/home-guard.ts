import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const homeGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const isLogged = await storageService.get('isLogged') ;
  const url = state.url;
  if(url == '/menu/home'){
    return isLogged ?? router.parseUrl('/login');
  }else{
    return isLogged ? router.parseUrl('/menu/home') :true;
  }
};
