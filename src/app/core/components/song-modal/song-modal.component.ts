import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams,  IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.component.html',
  styleUrls: ['./song-modal.component.css'],
  standalone:true,
  imports:[
    IonicModule,
    CommonModule
  ]
})
export class SongModalComponent implements OnInit {

  artstis_name:any;
  artstis_id:any;
  songs: any;
  constructor(private readonly navParams: NavParams, private readonly modalController: ModalController) { }

  ngOnInit() {
    this.artstis_name = this.navParams.get('name');
    this.artstis_id = this.navParams.get('id');
    this.songs = this.navParams.get('songs');
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async selectSong(song:any){
    await this.modalController.dismiss(song);
  }

}
