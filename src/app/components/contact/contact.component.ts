import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslatorService } from 'src/app/services/i18n/translator.service';
import { ContactMessage } from './contact-message';

@Component({
  selector: 'blublu-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
})
export class ContactComponent implements OnInit {
  //SEO
  data = {
    name: 'Contact BluBlu',
    description: 'Get in touch with BluBlu Games team',
    image: '../../../assets/img/blublu-logo-500-500.png',
    siteName: 'BluBlu Games',
    type: 'website',
  };
  //LANGUAGE
  currentLanguage: string;

  //MESSAGE
  @ViewChild('contactForm') form: any;

  contactMessage: ContactMessage = {
    email: null,
    message: null,
    dateAdded: null,
  };
  isMessageSent: boolean = false;
  email: string;
  message: string;

  constructor(
    private title: Title,
    private meta: Meta,
    private translator: TranslatorService,
  ) {}

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

  onSubmit({ value, valid }: { value: ContactComponent; valid: boolean }) {
    if (!valid) {
      //show error
    } else {
      //add
      // this.contact.sendMail(value);
      this.sendMail(value);
      this.clearForm();
      //show message
    }
  }

  sendMail(message) {
  }

  clearForm() {
    this.email = null;
    this.message = null;
    this.isMessageSent = true;
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();
  }
}
