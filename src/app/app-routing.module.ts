import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { WebsitesComponent } from './components/websites/websites.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'games', component: GamesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'websites', component: WebsitesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
