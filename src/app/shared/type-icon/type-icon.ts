import {Component, computed, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'ddkf-type-icon',
  imports: [
    MatIcon
  ],
  templateUrl: './type-icon.html',
  styleUrl: './type-icon.scss',
})
export class TypeIcon {

  static readonly MAPPING: { [key: string]: string } = {
    CAMP: 'category',
    HOTEL: 'night_shelter',
    WILD: 'local_parking',
    FOOD: 'restaurant',
    TOILET: 'wc',
    SHOWER: 'shower',
    SWIMMING: 'pool',
    WIFI: 'wifi',
    ELECTRICITY: 'bolt',
    SHOP: 'store',
    STAR: 'star'
  }

  iconType = input<string>('');
  icon = computed<string|null>(() => this.mapIcon(this.iconType()));

  mapIcon(iconType: string) {
    return Object.hasOwn(TypeIcon.MAPPING, iconType) ? TypeIcon.MAPPING[iconType] : null;
  }
}
