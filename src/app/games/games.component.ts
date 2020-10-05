import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'blublu-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass'],
})
export class GamesComponent implements OnInit {
  data = {
    name: 'About BluBlu',
    description: 'Information about BluBlu Games staff, goals and work ethics',
    image: 'avatar.png',
  };

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/about' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.description },
      { name: 'og:image', content: this.data.image },
    ]);
  }
}
