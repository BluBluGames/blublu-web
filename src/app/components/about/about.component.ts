import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslatorService } from 'src/app/services/i18n/translator.service';

@Component({
  selector: 'blublu-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  data = {
    name: 'About BluBlu',
    description: 'Information about BluBlu Games area of expertise and goals',
    image: '../../../assets/img/blublu-logo-500-500.png',
    siteName: 'BluBlu Games',
    type: 'website',
  };
  currentLanguage: string;

  constructor(private title: Title, private meta: Meta, private translator: TranslatorService) {}

  ngOnInit(): void {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'og:url', content: '/about' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.description },
      { name: 'og:image', content: this.data.image },
      { name: 'og:site_name', content: this.data.siteName },
      { name: 'og:type', content: this.data.type },
    ]);
    this.getCurrentLanguage();
  }

  toggle() {
    const toggle = document.querySelector('.toggle');
    const banner = document.querySelector('.banner');
    toggle.classList.toggle('active');
    banner.classList.toggle('active');
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
