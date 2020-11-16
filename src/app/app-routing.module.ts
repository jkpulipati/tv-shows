import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchShowsComponent } from './search-shows/search-shows.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowsComponent } from './shows/shows.component';

const routes: Routes = [
  {
    path: '',
    component: ShowsComponent
  },
  {
    path: 'search',
    component: SearchShowsComponent
  },
  {
    path: 'show/:id',
    component: ShowDetailsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
