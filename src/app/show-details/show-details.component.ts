import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowModel } from '../shared/config/models';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  showDetails$: Observable<Array<ShowModel>>;

  constructor(private service: SharedService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.snapshot.paramMap.get('id')) {
      const showId = +(this.router.snapshot.paramMap.get('id'));
      this.showDetails$ = this.service.getShowCrewCastSeasonDetails(showId);
    }
  }
}
