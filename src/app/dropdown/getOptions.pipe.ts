import { Pipe, PipeTransform } from '@angular/core';
import {Option} from './option';

/*
 * Define property names to use as the text and value for options
 * Takes two arguments, first to declare the property corresponding to text, the second the property corresponding to value
 * Usage:
 *   value | getDropdownOptions:textPropertyName:valuePropertyName
 * Example:
 *   {{ originalArray | getDropdownOptions: name id }}
*/
@Pipe({name: 'getDropdownOptions'})
export class GetDropdownOptionsPipe implements PipeTransform {
  transform(originalArray: any[], textPropertyName: string, valuePropertyName: string): Option[] {
    return originalArray.map(item => ({
      text: item[textPropertyName],
      value: item[valuePropertyName],
    }));
  }
}
