import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { SharedService } from '../shared/services/shared.service';

import { ShowsComponent } from './shows.component';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let service: SharedService;
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
    {...show}, {...show, id: 1217, rating: {average: 5.4}}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ShowsComponent ],
      providers: [
        SharedService,
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsComponent);
    service = TestBed.inject(SharedService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Func: getPopularShows method ', () => {
    it('should return the list of shows whose rating is greater than or equal to 8.5 ', () => {
      const popularShows = [
        {
          ...show,
          id: 1,
          name: 'Under the Dome',
          rating: {
            average: 9.5
          },
        },
        {
          ...show,
          id: 2,
          name: 'Breaking Bad',
          rating: {
            average: 9.8
          }
        },
        {
          ...show,
          id: 2,
          name: 'jk carousel',
          rating: {
            average: 5.8
          }
        }
      ];
      spyOn(service, 'getShowList').and.returnValue(of(popularShows));
      component.getPopularShows();
      component.popularShows$.subscribe(res => {
        expect(res.length).toEqual(2);
      });
    });

    it('should return the list of popular shows ', () => {
      const popularShows = [
        {
          ...show,
          id: 2,
          name: 'jk carousel',
          rating: {
            average: 5.8
          }
        }
      ];
      spyOn(service, 'getShowList').and.returnValue(of(popularShows));
      component.getPopularShows();
      component.popularShows$.subscribe(res => {
        expect(res.length).toEqual(0);
      });
    });
  });

  describe('Func: formatShows method ', () => {
    it('should return the shows filtered by unique genres ', () => {
      const popularShows = [
        {...show, id: 1217}
      ];
      const result = component.formatShows(shows, popularShows);
      expect(result.length).toEqual(4);
      expect(result[0].name).toEqual('Popular Shows');
    });

    it('should return shows sorted by rating', () => {
      const popularShows = [
        {...show, id: 1217}
      ];
      const result = component.formatShows(shows, popularShows);
      expect(result.length).toEqual(4);
      expect(result[result.length - 1].list[result[result.length - 1].list.length - 1].rating.average).toEqual(5.4);
    });
  });

  describe('Func: getUniqueGenres method ', () => {
    it('should return unique genres', () => {
      const result = component.getUniqueGenres(shows);
      expect(result.length).toEqual(3);
      expect(result).toContain('Drama');
    });

    it('should return unique genres of length is 0 with input as empty array', () => {
      const result = component.getUniqueGenres([{...show, genres: []}]);
      expect(result.length).toEqual(0);
    });
  });

  describe('Func: groupByUniqueGenres method ', () => {
    it('should return the filtered shows by unique genres', () => {
      const uniqueGenres = [
        'Drama',
        'Science-Fiction',
        'Thriller'
      ];
      const result = component.groupByUniqueGenres(uniqueGenres, shows);
      expect(result.length).toEqual(3);
      expect(result[0].list.length).toEqual(2);
    });

    it('should return the empty list of shows when we call with empty genres', () => {
      const uniqueGenres = [];
      const result = component.groupByUniqueGenres(uniqueGenres, shows);
      expect(result.length).toEqual(0);
    });
  });

});
