import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'blublu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'blublu-web';
  currentYear: number = new Date().getFullYear();

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    const browserLanguage = translate.getBrowserLang();
    const languageToAssign = browserLanguage.match(/en|pl/)
      ? browserLanguage
      : 'en';
    translate.use(languageToAssign);
  }
}
