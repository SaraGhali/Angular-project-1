import { Component, signal } from '@angular/core';
import { Home } from './components/home/home';
import { Products } from './components/products/products';

@Component({
  selector: 'app-root',
  imports: [Home,Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project-day2');
}
