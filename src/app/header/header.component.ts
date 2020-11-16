import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService, private route: Router) { }

  ngOnInit(): void {
  }

  search(value: string): void {
    if (value) {
      this.route.navigate(['/search', value]);
      this.sharedService.setSearchTerm(value);
    }
  }

}
