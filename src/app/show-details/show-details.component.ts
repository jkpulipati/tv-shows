import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showDetails$: Observable<any>;
  showEpisodeDetails$: Observable<any>;
  showCast$: Observable<any>;
  showCrew$: Observable<any>;
  showSeasons$: Observable<any>;
  seasonEpisodes$: Observable<any>;

  constructor(private service: SharedService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const showId = +(this.router.snapshot.paramMap.get('id'));
    // this.showEpisodeDetails$ = this.service.getEpisodesByShowId(showId);
    this.getShowCrewCastSeasonDetails(showId);
    // this.showCast$ = this.service.getShowCast(showId);
    // this.showCrew$ = this.service.getShowCrew(showId);
    // this.getShowSeasons(showId);
  }

  getShowCrewCastSeasonDetails(showId: number): void {
    this.showDetails$ = this.service.getShowCrewCastSeasonDetails(showId);
  }

  getShowSeasons(showId: number): void {
    this.showSeasons$ = this.service.getShowSeasons(showId).pipe(
      map(res => {
        if (res && res.length) {
          this.getSeasonsEpisodes(res[0].id);
        }
        return res;
      })
    );
  }

  getSeasonsEpisodes(seasonId: number): void {
    this.seasonEpisodes$ = this.service.getEpisodesBySeasonId(seasonId);
  }
}
