import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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

  constructor(private title: Title, private meta: Meta) {}


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

}
