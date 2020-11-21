import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { API_CONFIG, API_CONFIG_TOKEN } from '../shared/config/api.config';
import { SharedService } from '../shared/services/shared.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: SharedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ HeaderComponent ],
      providers: [
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
        SharedService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Func: search method', () => {
    it('should return jk ', () => {
      component.search('jk');
      service.getSearchTerm().subscribe(res => {
        expect(res).toEqual('jk');
      });
    });

    it('should return empty string ', () => {
      component.search('');
      service.getSearchTerm().subscribe(res => {
        expect(res).toEqual('');
      });
    });
  });

  describe('Func: keyPress method', () => {
    it('keyPress function test with jk as input ', () => {
      component.keyPress(new Event('test'));
    });
  });

});
