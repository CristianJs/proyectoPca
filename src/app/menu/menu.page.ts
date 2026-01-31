import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

})
export class MenuPage {

  constructor(
    private readonly _router: Router,
    private readonly _auth: AuthService,
    private readonly menuCtrl: MenuController,
    private readonly _storageService: StorageService,
  ) { }


    public async goToIntro(){
    await this._storageService.remove('intro') ;
    this._router.navigateByUrl('/intro');
  }

  public logout(){
    this._auth.logout();
    this.menuCtrl.close('mainMenu');
    this._router.navigateByUrl('/login');
  }


}
