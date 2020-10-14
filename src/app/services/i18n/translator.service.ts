import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(public translate: TranslateService) {

  }
  setLanguage(language: string) {
    this.translate.use(language)
  }
  getCurrentLanguage(): string {
    return this.translate.currentLang
  }
}
