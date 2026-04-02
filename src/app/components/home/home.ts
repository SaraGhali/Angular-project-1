import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Products } from '../products/products';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  searchTerm: string = '';
}
