import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  isLoggedIn$ = this.authService.isUserLoggedIn;

  logout() {
    this.authService.logout();
    this.toastr.info('Logout successful', 'Info');
    this.router.navigate(['/login']);
  }
}

