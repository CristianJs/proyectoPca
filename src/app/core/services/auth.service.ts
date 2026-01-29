import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private readonly _storageService:StorageService
) { }

  public login(data: {email:string,password:string}){
    return new Promise<string>((resolve, reject)=>{
      const { email,password } = data;
      if(email == 'cristian@gmail.com' && password == '123456'){
        this._storageService.set("isLogged", true);
        resolve("Hola Cristian");
      }else{
        reject(new Error('Credenciales invalidas'))
      }
    });

  }

}
