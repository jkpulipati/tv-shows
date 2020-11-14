import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit {

  @Input() crewList;

  constructor() { }

  ngOnInit(): void {
  }

}
