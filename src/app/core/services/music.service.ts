import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dataArtists from "./artist.json";
import { StorageService } from './storage.service';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://music.fly.dev"
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) { }

  getArtistsJson(){
    return dataArtists;
  }

  getArtists(){
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    )
  }

  getArtistTracks(artist_id:number){
    return fetch(`${this.urlServer}/tracks/artist/${artist_id}`).then(
      response => response.json()
    )
  }

  async saveFavorite(song:any){
    const user = await this.storageService.get('userData') || '{}';
    const body = {
      "user_id": user.id,
      "track_id": song.id
    };
    return this.http.post(`${this.urlServer}/favorite_tracks`, body, this.httpHeaders);
  }

  async removeFavorite(song:any){
    const user = await this.storageService.get('userData') || '{}';
    const body = {
      "user_id": user.id,
      "track_id": song.id
    };
    return this.http.delete(`${this.urlServer}/remove_favorite`, {body, headers: this.httpHeaders.headers});
  }


  async getFavoritos(song:any){
    const user = await this.storageService.get('userData') || '{}';
    return this.http.get(`${this.urlServer}/user_favorites/${user.id}`, this.httpHeaders).pipe(
      map( (res:any) => {
        return res.some( (fav:any) => fav.id === song.id )
      })
    )
  }

}
