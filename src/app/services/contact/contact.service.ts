import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ContactMessage } from '../../components/contact/contact-message';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactMessages: Observable<ContactMessage[]>;
  contactMessage: Observable<ContactMessage>;

  constructor(private http: HttpClient) {}

  sendMail(message: ContactMessage) {
    let url = 'http://localhost:5001/blublu-web/us-central1/sendMail';

    this.http
      .post(
        url,
        { email: message.email, message: message.message },
        { responseType: 'text' }
      )
      .subscribe(() => {
        //confirm response
      });
  }
}
