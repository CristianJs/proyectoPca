import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play, pause,heart, heartOutline, people, musicalNote, musicalNotes, contrast, menu} from 'ionicons/icons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
addIcons({
  play,
  pause,
  heart,
  heartOutline,
  people,
  musicalNotes,
  contrast,
  menu
});


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage,
    provideHttpClient(withInterceptors([])),

  ],
});
