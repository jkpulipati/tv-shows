import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { SharedService } from '../shared/services/shared.service';

import { SearchShowsComponent } from './search-shows.component';

describe('SearchShowsComponent', () => {
  let component: SearchShowsComponent;
  let fixture: ComponentFixture<SearchShowsComponent>;
  let sharedService: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ SearchShowsComponent ],
      providers: [
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowsComponent);
    sharedService = TestBed.inject(SharedService);
    spyOn(sharedService, 'getSearchTerm').and.returnValue(of('girls'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
