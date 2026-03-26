import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
  standalone: true
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: string, hideAllButLast4: boolean = true): string {
    if (!value || value.length < 4) {
      return value;
    }
    
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    if (hideAllButLast4) {
      // Hide all digits except the last 4
      const last4 = cleaned.slice(-4);
      const hidden = '*'.repeat(cleaned.length - 4);
      const hiddenCard = hidden + last4;
      // Format as: **** – **** – **** – 0000
      return hiddenCard.replace(/(\S{4})(?=\S)/g, '$1 – ');
    } else {
      // Format as: 0000 – 0000 – 0000 – 0000
      return cleaned.replace(/(\d{4})(?=\d)/g, '$1 – ');
    }
  }
}
