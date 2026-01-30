import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = "https://music.fly.dev"
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};


constructor(
  private readonly _storageService:StorageService,
  private readonly  http: HttpClient
) { }

  public login(data: {email:string,password:string}){
    return this.http.post<any>(this.urlServer+"/login", data, this.httpHeaders);
  }

  public register(data: {nombre:string, apellido: string, email:string, password:string}){
    return this.http.post<any>(this.urlServer+"/signup", data, this.httpHeaders);
  }

  logout(){
    this._storageService.remove("isLogged");
    this._storageService.remove("userData");
  }

}
