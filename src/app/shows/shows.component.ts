import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowModel } from '../shared/config/models';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  popularShows$: Observable<Array<ShowModel>>;
  groupByGenreShows: Array<ShowModel> = [];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.getPopularShows();
  }

  getPopularShows(): void {
    this.popularShows$ = this.service.getShowList().pipe(
      map( (shows: Array<ShowModel>) => {
        const popularShows = shows.filter(show => show.rating.average > 8.5);
        this.groupByGenreShows = this.formatShows(shows, popularShows);
        return popularShows;
      })
    );
  }

  formatShows(shows: Array<ShowModel>, popularShows: Array<ShowModel>): Array<ShowModel> {
    const result = shows.reduce((acc: Array<any>, res: ShowModel) => {
        acc = [...acc, ...res.genres];
        return [...new Set(acc)].sort();
    }, []).reduce( (res: Array<any>, genre: string) => {
        const list: Array<ShowModel> = shows.filter( (show: ShowModel) => show.genres.indexOf(genre) !== -1)
                          .sort((show1: ShowModel, show2: ShowModel) => show2.rating.average - show1.rating.average);
        const newGenre = {name: `${genre} Shows`, list};
        res = [...res, newGenre];
        return res;
    }, []);

    popularShows = popularShows.sort((show1: ShowModel, show2: ShowModel) => show2.rating.average - show1.rating.average);

    return [
      {name: `Popular Shows`, list: popularShows }, ...result
    ];
  }
}
