import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

 setTheme(theme: 'theme-light' | 'theme-dark' | 'theme-blue') {
    document.body.classList.remove(
      'theme-light',
      'theme-dark',
      'theme-blue'
    );
    document.body.classList.add(theme);
  }

}
