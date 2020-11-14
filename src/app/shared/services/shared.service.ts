import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { API_CONFIG_TOKEN } from '../config/api.config';
import { environment } from '../../../environments/environment';
import { filter, map } from 'rxjs/operators';
import { ShowModel } from '../config/models';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.base_url;
  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, @Inject(API_CONFIG_TOKEN) private apiConfig) { }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(value: string): void {
    this.searchTerm$.next(value);
  }

  getSearchByKeyword(value: string): Observable<any> {
    const url = `${this.baseUrl}/search/shows?q=${value}`;
    return this.http.get(url).pipe(
      map((results: any) => {
        return results.map( (show: any) => ({...show.show}));
      })
    );
  }


  getSearchByPerson(value: string): Observable<any> {
    const url = `${this.baseUrl}/search/people?q=${value}`;
    return this.http.get(url).pipe(
      map((results: any) => {
        return results.map( (show: any) => ({...show.person}));
      })
    );
  }

  getShowList(): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.SHOWS}`;
    return this.http.get(url);
  }

  getShowDetails(showId: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.SHOWS}/${showId}`;
    return this.http.get(url);
  }

  getShowCrewCastSeasonDetails(showId: number): Observable<any> {
    const url = `${this.baseUrl}${this.apiConfig.SHOWS}/${showId}${this.apiConfig.CREW_CAST_SEASON_DETAILS}`;
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
