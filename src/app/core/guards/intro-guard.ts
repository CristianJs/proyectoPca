import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const introGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const intro = await storageService.get('intro') ;
  const url = state.url;
  const isLogged = await storageService.get('isLogged') ;
  if(!isLogged){
    return router.parseUrl('/login');
  }else if(url == '/intro'){
    return intro ? router.parseUrl('/home') : true;
  }else{
    return intro ? true : router.parseUrl('/intro');
  }
};
