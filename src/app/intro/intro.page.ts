import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent,  CommonModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage{

  slides : any = [
    {
      "id": 1,
      "titulo": "Descubre algo nuevo",
      "imagen": "assets/images/slide1.png",
      "descripcion": "Descubre la musica que siempre quisiste escuchar solo con un click."
    },
    {
      "id": 2,
      "titulo": "Agrupa en un solo lugar",
      "imagen": "assets/images/slide2.png",
      "descripcion": "Crea playlists por genero para que cada día sepas que elegir."
    },
    {
      "id": 3,
      "titulo": "Comparte",
      "imagen": "assets/images/slide3.png",
      "descripcion": "Comparte la musica que escuchas y has que los buenos gustos perduren"
    },
    {
      "id": 4,
      "titulo": "Un nuevo mundo",
      "imagen": "assets/images/slide4.png",
      "descripcion": "Explora un nuevo mundo del cual no vas a querer salir, Bienvenido"
    }
  ]

  constructor(
    private readonly _router: Router,
    private readonly _storageService: StorageService
  ) { }

  async goHome(){
    await this._storageService.set('intro',"true");
    this._router.navigateByUrl('/home');
  }

}
