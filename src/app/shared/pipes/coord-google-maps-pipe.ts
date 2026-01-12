import { Pipe, PipeTransform } from '@angular/core';
import {googleMapsUrlFromCoords} from '../utils';

@Pipe({
  name: 'coordGoogleMaps',
})
export class CoordGoogleMapsPipe implements PipeTransform {

  transform(value: string): string {
    return googleMapsUrlFromCoords(value)
  }

}
