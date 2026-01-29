import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const introGuard: CanActivateFn = async (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const intro = await storageService.get('intro') ;
  const url = state.url;
  if(url == '/intro'){
    return intro ? router.parseUrl('/home') : true;
  }else{
    console.log("s")
    return intro ? true : router.parseUrl('/intro');
  }
};
