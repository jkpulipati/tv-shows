import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG_TOKEN } from '../config/api.config';
import { environment } from '../../../environments/environment';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.base_url;

  constructor(private http: HttpClient, @Inject(API_CONFIG_TOKEN) private apiConfig) { }

  getShowList(): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.SHOWS}`;
    return this.http.get(url);
  }

  getShowDetails(showId: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.SHOWS}/${showId}`;
    return this.http.get(url);
  }

  getEpisodesByShowId(showId: number): Observable<any> {
    const url = `${this.baseUrl}/${showId}/episodes`;
    return this.http.get(url);
  }

  getShowCast(showId: number): Observable<any> {
    const url = `${this.baseUrl}/shows/${showId}/cast`;
    return this.http.get(url);
  }

  getShowCrew(showId: number): Observable<any> {
    const url = `${this.baseUrl}/shows/${showId}/crew`;
    return this.http.get(url);
  }

  getShowSeasons(showId: number): Observable<any> {
    const url = `${this.baseUrl}/shows/${showId}/seasons`;
    return this.http.get(url);
  }

  getEpisodesBySeasonId(seasonId: number): Observable<any> {
    const url = `${this.baseUrl}/seasons/${seasonId}/episodes`;
    return this.http.get(url);
  }

  getShowGallery(): Observable<any> {
    const url = `${this.baseUrl}/${this.apiConfig.SHOW_IMAGES}`;
    return this.http.get(url);
  }
}
