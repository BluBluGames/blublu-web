import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslatorService } from 'src/app/services/i18n/translator.service';

@Component({
  selector: 'blublu-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.sass']
})
export class PrivacyPolicyComponent implements OnInit {
  data = {
    name: 'BluBlu Privacy Policy',
    description: 'Information about BluBlu Games privacy policy',
    image: 'avatar.png',
  };
  currentLanguage: string;

  constructor(private title: Title, private meta: Meta, private translator: TranslatorService) {}

  ngOnInit(): void {
        this.title.setTitle(this.data.name);
        this.meta.addTags([
            { name: 'twitter:card', content: 'summary' },
            { name: 'og:url', content: '/privacy-policy' },
            { name: 'og:title', content: this.data.name },
            { name: 'og:description', content: this.data.description },
            { name: 'og:image', content: this.data.image },
          ]);
  }

  toggle() {
    const toggle = document.querySelector('.toggle');
    const banner = document.querySelector('.banner');
    const test = document.querySelector('.isToggledTest');
    toggle.classList.toggle('active');
    banner.classList.toggle('active');
    test.classList.toggle('active');
  }

  getData() {
    return this.data;
  }

  setLanguage(language: string) {
    this.translator.setLanguage(language);
    this.getCurrentLanguage();
  }

  getCurrentLanguage() {
    this.currentLanguage = this.translator.getCurrentLanguage();
  }
}
