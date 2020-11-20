import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { SharedService } from '../shared/services/shared.service';

import { SearchShowsComponent } from './search-shows.component';

fdescribe('SearchShowsComponent', () => {
  let component: SearchShowsComponent;
  let fixture: ComponentFixture<SearchShowsComponent>;
  let sharedService: SharedService;
  const show = {
    id: 1,
    url: 'http://www.tvmaze.com/shows/1/under-the-dome',
    name: 'Under the Dome',
    type: 'Scripted',
    language: 'English',
    genres: [
      'Drama',
      'Science-Fiction',
      'Thriller'
    ],
    status: 'Ended',
    runtime: 60,
    premiered: '2013-06-24',
    officialSite: 'http://www.cbs.com/shows/under-the-dome/',
    schedule: {
    time: '22:00',
    days: [
      'Thursday'
    ]
    },
    rating: {
      average: 9.5
    },
    weight: 97,
    network: {
      id: 2,
      name: 'CBS',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York'
      }
    },
    webChannel: null,
    externals: {
    },
    image: {
    medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original: 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
    },
    updated: 1573667713
  };
  const shows = [
    {...show}, {...show, id: 1217}
  ];

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(sharedService, 'getSearchTerm').and.returnValue(of('girls'));
    spyOn(sharedService, 'getSearchByKeyword').and.returnValue(of(shows));
    expect(component).toBeTruthy();
    component.searchShows$.subscribe(res => {
      expect(res).toEqual(shows);
    });
  });
});
