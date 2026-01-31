import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { StorageService } from '../core/services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage  {

  registerForm: FormGroup = new FormGroup({});

    public validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "Email invalido" }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "minlength", message: "La contraseña debe contener minimo 6 caracteres" },
      { type: "maxlength", message: "La contraseña debe contener maximo 10 caracteres" }
    ],
    name: [
      { type: "required", message: "El nombre es obligatorio" },
      { type: "minlength", message: "El nombre debe contener minimo 3 caracteres" }
    ],
    last_name: [
      { type: "required", message: "El apellido es obligatorio" },
      { type: "minlength", message: "El apellido debe contener minimo 3 caracteres" }
    ],
    username: [
      { type: "required", message: "El nombre de usuario es obligatorio" },
      { type: "minlength", message: "El nombre de usuario debe contener minimo 3 caracteres" }
    ]
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly _authService: AuthService,
    private readonly _navCtrl: NavController,
    private readonly alertController: AlertController,
  ) {
    this.createForm();
  }


  private createForm(){
    this.registerForm = this.formBuilder.group({
      user:new FormGroup({
        username:  new FormControl("",Validators.compose([Validators.required,Validators.minLength(3)])),
        name:  new FormControl("",Validators.compose([Validators.required,Validators.minLength(3)])),
        last_name: new FormControl("",Validators.compose([Validators.required,Validators.minLength(3)])),
        email: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])),
        password: new FormControl("",Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(10)]))
      })

    })
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
  }

  async register(data: any){
     this._authService.register(data).subscribe({
      next: (res)=>{
        this.presentAlert('Registro Exitoso', 'Usuario registrado: ' + data.user.name);
        this._navCtrl.navigateRoot('/login');
      },
      error: (err)=>{
        this.presentAlert('Error', 'Credenciales invalidas: ' + err.error.errors);
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
}
