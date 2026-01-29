import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

  public login(data: {email:string,password:string}){
    return new Promise<string>((resolve, reject)=>{
      const { email,password } = data;
      if(email == 'cristian@gmail.com' && password == '123456'){
        resolve("Hola Cristian");
      }else{
        reject(new Error('Credenciales invalidas'))
      }
    });

  }

}
