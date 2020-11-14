import { Component, Input, OnInit } from '@angular/core';
import { ShowModel } from '../shared/config/models';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.css']
})
export class CastListComponent implements OnInit {

  @Input() castList: Array<ShowModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
