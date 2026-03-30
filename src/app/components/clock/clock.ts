import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.html',
  styleUrl: './clock.css'
})
export class Clock implements OnInit, OnDestroy {
  currentTime: string = '';
  intervalId: any = null;
  showClock = true;

  ngOnInit(): void {
    this.startClock();
  }

  startClock(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.currentTime = new Date().toLocaleString();

    this.intervalId = setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  toggleClock(): void {
    this.showClock = !this.showClock;

    if (this.showClock) {
      this.startClock();
    } else {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Clock stopped');
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Clock stopped');
    }
  }
}