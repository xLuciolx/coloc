import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Takes a value and capitalize it.
   */
    transform(name: string): string {
        if (!name) {
            return name
        }
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}
