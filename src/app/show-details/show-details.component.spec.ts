import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { SharedService } from '../shared/services/shared.service';

import { ShowDetailsComponent } from './show-details.component';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
  let service: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ShowDetailsComponent ],
      providers: [
        SharedService,
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: {get: () => '123'}}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Func: getSearchKeyword method', () => {
    it('should return jk ', () => {
      service.setSearchTerm('jk');
      expect(component.searchTerm).toEqual('jk');
    });
  });

  describe('Func: getShowDetails method', () => {
    it('should return show details', () => {
      component.getShowDetails();
      expect(component.showDetails$).toBeDefined();
    });

    it('should return show details', () => {
      spyOn(service, 'getShowCrewCastSeasonDetails').and.returnValue(throwError({}));
      component.getShowDetails();
      expect(component.showDetails$).toBeDefined();
    });
  });
});
