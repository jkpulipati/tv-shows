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
  popularRating = 8.5;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.service.setSearchTerm('');
    this.getPopularShows();
  }

  // get popular shows whose rating is greater than equal to 9
  getPopularShows(): void {
    this.popularShows$ = this.service.getShowList().pipe(
      map( (shows: Array<ShowModel>) => {
        const popularShows = shows.filter(show => show.rating.average > this.popularRating);
        this.groupByGenreShows = this.formatShows(shows, popularShows);
        return popularShows;
      })
    );
  }

  // should return the popular and unique genre shows
  formatShows(shows: Array<ShowModel>, popularShows: Array<ShowModel>): Array<ShowModel> {
    const uniqueGenres: Array<string> = this.getUniqueGenres(shows);
    const result: Array<ShowModel> = this.groupByUniqueGenres(uniqueGenres, shows);

    const list = popularShows.sort((show1: ShowModel, show2: ShowModel) => show2.rating.average - show1.rating.average);

    return [
      {...list[0], name: `Popular Shows`, list }, ...result
    ];
  }

  // get unique genres from all shows
  getUniqueGenres(shows: Array<ShowModel>): Array<string> {
    return shows.reduce((acc: Array<any>, res: ShowModel) => {
        acc = [...acc, ...res.genres];
        return [...new Set(acc)].sort();
    }, []);
  }

  // should return genre shows
  groupByUniqueGenres(genres: Array<string>, shows: Array<ShowModel>): Array<ShowModel> {
    return genres.reduce( (res: Array<any>, genre: string) => {
        const list: Array<ShowModel> = shows.filter( (show: ShowModel) => show.genres.indexOf(genre) !== -1)
                          .sort((show1: ShowModel, show2: ShowModel) => show2.rating.average - show1.rating.average);
        const newGenre = {name: `${genre}`, list};
        res = [...res, newGenre];
        return res;
    }, []);
  }
}
