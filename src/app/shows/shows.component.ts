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

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.getPopularShows();
  }

  getPopularShows(): void {
    this.popularShows$ = this.service.getShowList().pipe(
      map( (shows: any) => {
        console.log(shows);
        return shows.filter(show => show.rating.average > 8.8);
      })
    );
  }

}
