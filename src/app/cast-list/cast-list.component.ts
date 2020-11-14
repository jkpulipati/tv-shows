import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent implements OnInit {

  @Input() castList;

  constructor() { }

  ngOnInit(): void {
  }

}
