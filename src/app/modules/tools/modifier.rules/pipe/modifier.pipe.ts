import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifier'
})
export class ModifierPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return '';
    
    // Remove existing commas and split the string into chunks of two characters
    const chunks = value.replace(/,/g, '').match(/.{1,2}/g);
    
    // Join the chunks with commas and return the result
    return chunks ? chunks.join(',') : '';
  }

}
