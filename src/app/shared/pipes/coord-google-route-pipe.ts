import {Pipe, PipeTransform} from '@angular/core';
import {googleMapsRouteUrl} from '../utils';

@Pipe({
  name: 'coordGoogleRoute',
})
export class CoordGoogleRoutePipe implements PipeTransform {

  transform(target: string, ...args: string[]): string {
    return googleMapsRouteUrl(target, args[0]);
  }

}
