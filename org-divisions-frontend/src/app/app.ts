import { Component, signal } from '@angular/core';
import { FixedPage } from './divisions/fixed-page/fixed-page';

@Component({
  selector: 'app-root',
  imports: [FixedPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('org-divisions-frontend');
}
