import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowsComponent } from './shows/shows.component';

const routes: Routes = [
  {
    path: '',
    component: ShowsComponent,
  },
  {
    path: 'show/:id',
    component: ShowDetailsComponent,
    children: [
      { path: 'cast', component: ShowsComponent },
      { path: 'crew', component: ShowsComponent },
      { path: 'images', component: ShowsComponent },
      { path: 'seasons', component: ShowsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
