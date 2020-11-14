import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_CONFIG, API_CONFIG_TOKEN } from '../config/api.config';

import { SharedService } from './shared.service';

fdescribe('SharedService', () => {
  let service: SharedService;

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getSearchTerm', () => {
    service.setSearchTerm('jk');
    const obs$ = service.getSearchTerm();
    obs$.subscribe(res => {
      expect(res).toEqual('jk');
    });
  });

  it('should call getShowList', () => {
    expect(service.getShowList()).toBeDefined();
  });

  it('should call getShowDetails', () => {
    expect(service.getShowDetails(1217)).toBeDefined();
  });

  it('should call getShowCrewCastSeasonDetails', () => {
    expect(service.getShowCrewCastSeasonDetails(1217)).toBeDefined();
  });

  it('should call getEpisodesByShowId', () => {
    expect(service.getEpisodesByShowId(1217)).toBeDefined();
  });

  it('should call getShowCast', () => {
    expect(service.getShowCast(1217)).toBeDefined();
  });

  it('should call getShowCrew', () => {
    expect(service.getShowCrew(1217)).toBeDefined();
  });

  it('should call getShowSeasons', () => {
    expect(service.getShowSeasons(1217)).toBeDefined();
  });

  it('should call getEpisodesBySeasonId', () => {
    expect(service.getEpisodesBySeasonId(1217)).toBeDefined();
  });

  it('should call getShowGallery', () => {
    expect(service.getShowGallery()).toBeDefined();
  });
});
