import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShowModel } from '../shared/config/models';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showDetails$: Observable<Array<ShowModel>>;
  searchTerm: string;

  constructor(private service: SharedService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSearchKeyword();
    this.getShowDetails();
  }

  getSearchKeyword(): void {
    this.service.getSearchTerm().subscribe(value => {
      this.searchTerm = value ? value : '';
    });
  }

  getShowDetails(): void {
    if (this.router.snapshot.paramMap.get('id')) {
      const showId = +(this.router.snapshot.paramMap.get('id'));
      if (showId) {
        this.showDetails$ = this.service.getShowCrewCastSeasonDetails(showId).pipe(
          catchError(err => this.route.navigate(['']))
        );
      } else {
        this.route.navigate(['']);
      }
    }
  }
}
