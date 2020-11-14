import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IvyCarouselModule } from 'angular-responsive-carousel';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShowsComponent } from './shows/shows.component';
import { API_CONFIG, API_CONFIG_TOKEN } from './shared/config/api.config';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { SearchShowsComponent } from './search-shows/search-shows.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { CrewListComponent } from './crew-list/crew-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowsComponent,
    ShowDetailsComponent,
    SearchShowsComponent,
    CastListComponent,
    CrewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [
    {
      provide: API_CONFIG_TOKEN,
      useValue: API_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
