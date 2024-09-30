import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortNumberPipe implements PipeTransform {

  transform(value: string[]): string[] {
    return value
      .map(num => Number(num)) // Convert strings to numbers
      .sort((a, b) => a - b)   // Sort numbers in ascending order
      .map(num => num.toString()); // Convert back to strings
  }

}
