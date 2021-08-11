import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslatorService } from 'src/app/services/i18n/translator.service';

@Component({
  selector: 'blublu-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass'],
})
export class GamesComponent implements OnInit {
  data = {
    name: 'BluBlu Games',
    description: 'Previous game projects made by BluBlu Games',
    image: '../../../assets/img/blublu-logo-500-500.png',
    siteName: 'BluBlu Games',
    type: 'website',
  };
  currentLanguage: string;
  carousel = document.querySelector('.carousel-image');
  slides = document.getElementsByClassName('carousel-img');
  carouselText = document.querySelector('.carousel-text');
  slidesText = document.getElementsByClassName('slide-text');
  currentSlide = 0;

  constructor(
    private title: Title,
    private meta: Meta,
    private translator: TranslatorService
  ) {}

  ngOnInit(): void {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'og:url', content: '/' },
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

  nextSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.slidesText[this.currentSlide].classList.remove('active');

    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    this.slides[this.currentSlide].classList.add('active');
    this.slidesText[this.currentSlide].classList.add('active');
  }
  previousSlide() {
    this.slides[this.currentSlide].classList.remove('active');
    this.slidesText[this.currentSlide].classList.remove('active');

    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;

    this.slides[this.currentSlide].classList.add('active');
    this.slidesText[this.currentSlide].classList.add('active');
  }
}
