import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  popularShows$: Observable<any>;
  groupByGenreShows: Array<any> = [];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.getPopularShows();
  }

  getPopularShows(): void {
    this.popularShows$ = this.service.getShowList().pipe(
      map( (shows: any) => {
        console.log(shows);
        this.groupByGenreShows = this.formatShows(shows);
        return shows.filter(show => show.rating.average > 8.8);
      })
    );
  }

  formatShows(shows: any): Array<any> {
    return shows.reduce((acc, res) => {
        acc = [...acc, ...res.genres];
        return [...new Set(acc)].sort();
    }, []).reduce( (res, genre) => {
        const list = shows.filter(show => show.genres.indexOf(genre) !== -1)
                          .sort((show1, show2) => show2.rating.average - show1.rating.average);
        const newGenre = {name: `${genre} Shows`, list};
        res = [...res, newGenre];
        return res;
    }, []);
  }

}
