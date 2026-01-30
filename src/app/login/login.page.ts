import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton,IonText } from '@ionic/angular/standalone';
import { StorageService } from '../core/services/storage.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    IonText
  ]
})
export class LoginPage {

  loginForm: FormGroup = new FormGroup({});
  typeInput: string = 'password';

  public validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Email invalido" }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "minlength", message: "La contraseña debe contener minimo 6 caracteres" },
    ]
  }
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storage: StorageService,
    private readonly alertController: AlertController,
    private readonly _authService: AuthService,
    private readonly _navCtrl: NavController,
    private readonly _router: Router,

  ) {
    this.createForm();
  }

  private createForm(){
    this.loginForm = this.formBuilder.group({
      user:new FormGroup({
        email: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),
        password: new FormControl("",Validators.compose([Validators.required,Validators.minLength(6)]))
      }),
    })
  }

  public loginUser(dataLogin: any) {
    this._authService.login(dataLogin).subscribe({
      next: (res)=>{
        this.storage.set("isLogged", true);
        this.storage.set("userData", res.user);
        this._navCtrl.navigateRoot('/home');
        this.presentAlert('Login Exitoso', 'Bienvenido ' + res.msg);
      },
      error: (err)=>{
        this.presentAlert('Error', 'Credenciales invalidas: ' + err.error.errors["email or password"][0]);
      }
    })
  }

  async presentAlert(header: string,message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToRegister(){
    this._router.navigateByUrl('/register')
  }

}
