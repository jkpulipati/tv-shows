import { Component, Input, OnInit } from '@angular/core';
import { ShowModel } from '../shared/config/models';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit {

  @Input() crewList: Array<ShowModel>;

  constructor() { }

  ngOnInit(): void {
  }

}
