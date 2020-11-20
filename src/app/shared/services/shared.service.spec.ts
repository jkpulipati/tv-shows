import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_CONFIG, API_CONFIG_TOKEN } from '../config/api.config';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;
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
    rating: {
      average: 9.5
    },
    image: {
      medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
      original: 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
    }
  };
  const shows = [
    {...show}, {...show, id: 1217}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG}
      ]
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the value as jk when we call getSearchTerm', () => {
    service.setSearchTerm('jk');
    const obs$ = service.getSearchTerm();
    obs$.subscribe(res => {
      expect(res).toEqual('jk');
    });
  });

  describe('Func: getShowList method ', () => {
    it('should get the list of all shows', () => {
      spyOn(service, 'getShowList').and.returnValue(of(shows));
      service.getShowList().subscribe((res) => {
        expect(res).toEqual(shows);
      });
    });
  });

  describe('Func: getShowCrewCastSeasonDetails method ', () => {
    it('should return the show crew cast season details', () => {
      const castCrewInfo = {
        ...show,
        _embedded: {
          cast: [
            {
              person: {
                id: 14234,
                name: 'Bryan Cranston',
                image: {
                  medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/231/579726.jpg',
                  original: 'http://static.tvmaze.com/uploads/images/original_untouched/231/579726.jpg'
                }
              }
            }
          ],
          crew: [
            {character: {id: 45531, name: 'Jesse Pink man'}},
            {person: {id: 12328, url: 'http://www.tvmaze.com/people/12328/aaron-paul', name: 'Aaron Paul'}}
          ],
          seasons: [
            {
            id: 753,
            image: {
              medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/231/579726.jpg',
              original: 'http://static.tvmaze.com/uploads/images/original_untouched/231/579726.jpg'
              }
            }
          ]
        }
      };
      spyOn(service, 'getShowCrewCastSeasonDetails').and.returnValue(of(castCrewInfo));
      service.getShowCrewCastSeasonDetails(638).subscribe((res) => {
        expect(res).toEqual(castCrewInfo);
      });
    });
  });

  describe('Func: getSearchByKeyword method ', () => {
    it('should return the list of shows with search as girls', () => {
      spyOn(service, 'getSearchByKeyword').and.returnValue(of(shows));
      service.getSearchByKeyword('girls').subscribe((res) => {
        expect(res).toEqual(shows);
      });
    });
  });
});
