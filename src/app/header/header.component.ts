import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  keyPress(event: any): void {
    const pattern = /[A-Za-z0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
  }

}
