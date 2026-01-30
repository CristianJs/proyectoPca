import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MusicService } from '../core/services/music.service';
import { SongModalComponent } from '../core/components/song-modal/song-modal.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,CommonModule],
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
    private readonly _musicService: MusicService,
    private readonly _modalController: ModalController
  ) {
  }

  ionViewWillEnter(){
    this.getIntro();
  }

  ngOnInit(): void{
    this.getCurrentTheme();
    this._musicService.getArtists().then(data =>{
      this.artists = data;
      this.songElectronica = data.filter((el: any)=> {
        return el.genres.some((el2:any) => el2.match('electronica'))
      });
      this.songRegueaton = data.filter((el: any)=> {
        return el.genres.some((el2:string) => {
          return el2.trim() == 'reggueton'
        })
      });
      this.songVallenato = data.filter((el: any)=> {
        return el.genres.some((el2:string) => {
          return el2.trim() == 'vallenato'
        })
      });
    })
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


  artistsJson: any;
  artists: any;
  song = {
    name: '',
    playing: false,
    preview_url: ''
  }
  songElectronica : any;
  songRegueaton : any;
  songVallenato : any;
  currentSong: any = null;
  newTime:any;

  async showSongs(artstis: any){
    const songs = await this._musicService.getArtistTracks(artstis.id);
    const modal = await this._modalController.create(
      {
        component: SongModalComponent,
        componentProps: {
          name: artstis.name,
          id: artstis.id,
          songs: songs
        }
      }
    );
    modal.onDidDismiss().then((dataReturned:any )=> {
      this.song = dataReturned.data;
      console.log(this.song)
      this.play()

    })
    modal.present();
  }

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", ()=>{
      this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }
  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = "0.00"){
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime/60).toString();
      if (minutes.length == 1){
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1){
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
    return null
  }

}
