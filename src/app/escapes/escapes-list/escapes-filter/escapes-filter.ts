import {Component, effect, output, signal} from '@angular/core';
import {TypeIcon} from '../../../shared/type-icon/type-icon';


export interface Filter {
  locationType?: string;
  offers: string[]
}

@Component({
  selector: 'ddkf-escapes-filter',
  imports: [
    TypeIcon
  ],
  templateUrl: './escapes-filter.html',
  styleUrl: './escapes-filter.scss',
})
export class EscapesFilter {
  readonly filters = signal([
    {type: 'LOCATION', key: 'CAMP', filter: false},
    {type: 'LOCATION', key: 'HOTEL', filter: false},
    {type: 'LOCATION', key: 'WILD', filter: false},
    {type: 'OFFER', key: 'FOOD', filter: false},
    {type: 'OFFER', key: 'TOILET', filter: false},
    {type: 'OFFER', key: 'SHOWER', filter: false},
    {type: 'OFFER', key: 'SWIMMING', filter: false},
    {type: 'OFFER', key: 'WIFI', filter: false},
    {type: 'OFFER', key: 'ELECTRICITY', filter: false},
    {type: 'OFFER', key: 'SHOP', filter: false},
  ])

  filter = output<Filter>();

  constructor() {
    effect(() => {
      this.filter.emit(
        this.filters()
          .filter(f => f.filter)
          .reduce((filterObject, filter) => {
            if(filter.type==='LOCATION'){
              filterObject.locationType = filter.key;
            } else {
              filterObject.offers.push(filter.key)
            }
            return filterObject;
          }, {
            locationType: undefined,
            offers: []
          } as Filter)
      );
    });
  }


  toggleFilter(key: string) {
    this.filters.update(filters => {
      const filterElement = filters.find(f => f.key === key)!;
      filterElement.filter = !filterElement?.filter;

      if (filterElement.type === 'LOCATION') {
        filters.filter(f => f.key !== key && f.type === 'LOCATION').forEach(f => f.filter = false);
      }

      return [...filters];
    })
  }
}
