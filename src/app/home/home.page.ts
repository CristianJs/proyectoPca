import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonItem,IonList } from '@ionic/angular/standalone';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonMenu,IonList,IonItem],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{

  public colorClaro = 'card-claro'
  public colorOscuro = 'card-oscuro'
  public theme = '';
  public intro : boolean = false;

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
  constructor(
    private readonly _storageService: StorageService,
    private readonly _router: Router,
    private readonly _auth: AuthService,
  ) {
  }

  ionViewWillEnter(){
    this.getIntro();
  }

  ngOnInit(): void{
    this.getCurrentTheme();
  }

  async setTheme(){
    this.theme = this.theme == this.colorOscuro ? this.colorClaro : this.colorOscuro;
    await this._storageService.set('theme', this.theme);
  }

  async getCurrentTheme(){
    this.theme = await this._storageService.get('theme') ;
  }

  public async goToIntro(){
    await this._storageService.remove('intro') ;
    this._router.navigateByUrl('/intro');
  }

  public async getIntro(){
    this.intro = await this._storageService.get('intro') ;
  }

  public logout(){
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }


}
