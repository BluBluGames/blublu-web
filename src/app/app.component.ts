import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeInAnimation } from './route-animations';

@Component({
  selector: 'blublu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [fadeInAnimation],
})
export class AppComponent {
  title = 'blublu-web';
}
