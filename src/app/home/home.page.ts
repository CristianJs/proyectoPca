import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {

  slides : any = [
    {
      "id": 1,
      "titulo": "Bienvenido a Nuestra Plataforma",
      "imagen": "https://picsum.photos/800/400?random=1",
      "descripcion": "Descubre todas las herramientas que tenemos para ayudarte a crecer y alcanzar tus objetivos."
    },
    {
      "id": 2,
      "titulo": "Soluciones Innovadoras",
      "imagen": "https://picsum.photos/800/400?random=2",
      "descripcion": "Ofrecemos soluciones modernas y eficientes diseñadas para adaptarse a tus necesidades."
    },
    {
      "id": 3,
      "titulo": "Soporte y Confianza",
      "imagen": "https://picsum.photos/800/400?random=3",
      "descripcion": "Nuestro equipo está siempre disponible para brindarte soporte y acompañarte en cada paso."
    }
  ]
  constructor() {}
}
