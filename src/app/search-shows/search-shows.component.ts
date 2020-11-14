import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-search-shows',
  templateUrl: './search-shows.component.html',
  styleUrls: ['./search-shows.component.css']
})
export class SearchShowsComponent implements OnInit {

  searchShows$: Observable<any>;

  constructor(private sharedService: SharedService, private route: Router) { }

  ngOnInit(): void {
    this.sharedService.getSearchTerm().subscribe(value => {
      if (value) {
        this.searchShows$ = this.sharedService.getSearchByKeyword(value);
      } else {
        this.route.navigate(['']);
      }
    });
  }
}
