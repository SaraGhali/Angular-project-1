import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCardShadow]',
  standalone: true
})
export class CardShadow implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Apply rounded border and shadow styles
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '15px');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #e0e0e0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.3s ease');
  }
}
