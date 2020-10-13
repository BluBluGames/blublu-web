import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'blublu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  data = {
    name: 'BluBlu Games',
    description: 'BluBlu Games is a software house focused on creating games and websites',
    image: '../../../assets/img/blublu-logo-500-500.png',
    siteName: 'BluBlu Games',
    type: 'website',
  };

  constructor(private title: Title, private meta: Meta) {}

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
  }

  toggle() {
    const toggle = document.querySelector('.toggle');
    const banner = document.querySelector('.banner');
    toggle.classList.toggle('active');
    banner.classList.toggle('active');
  }
}
