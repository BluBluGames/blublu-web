import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WebsitesComponent } from './components/websites/websites.component';
import { ContactComponent } from './components/contact/contact.component';
import { GamesComponent } from './components/games/games.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GamesComponent,
    ContactComponent,
    HomeComponent,
    WebsitesComponent,
    NavigationComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    AngularFireFunctionsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
