import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;
  constructor(private  _storage: Storage) {
    this.init();
  }

  async init(){
    const storage = await this._storage.create();
    this.storage = storage;
  }

  private async ready(){
    if(!this.storage){
      await this.init()
    }
  }

  public async set(key: string, value: string | boolean){
    await this.ready();
    return this.storage?.set(key, value);
  }

  public async get(key:string){
    await this.ready();
    return this.storage?.get(key)
  }

  public async remove(key:string){
    await this.ready();
    return this.storage?.remove(key)
  }

  public async clear(){
    await this.ready();
    return this.storage?.clear()
  }

  public async keys(){
    await this.ready();
    return this.storage?.keys()
  }

  public async length(){
    await this.ready();
    return this.storage?.length()
  }
}
