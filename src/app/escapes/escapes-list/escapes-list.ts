import {Component, computed, inject, signal} from '@angular/core';
import {MatCard, MatCardFooter, MatCardHeader} from '@angular/material/card';
import {CoordGoogleMapsPipe} from '../../shared/pipes/coord-google-maps-pipe';
import {CoordGoogleRoutePipe} from '../../shared/pipes/coord-google-route-pipe';
import {environment} from '../../../environments/environment';
import {TypeIcon} from '../../shared/type-icon/type-icon';
import {EscapesService} from '../../shared/escapes-service';
import {StarVoting} from '../../shared/star-voting/star-voting';
import {EscapesFilter, Filter} from './escapes-filter/escapes-filter';
import {Escape} from '../../shared/models';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'ddkf-escapes-list',
  imports: [
    MatCard,
    MatCardHeader,
    CoordGoogleMapsPipe,
    CoordGoogleRoutePipe,
    TypeIcon,
    MatCardFooter,
    StarVoting,
    EscapesFilter,
    MatFabButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './escapes-list.html',
  styleUrl: './escapes-list.scss',
})
export class EscapesList {

  readonly homeLocationCoordinates = environment.home;
  escapesService = inject(EscapesService)
  escapeResource = this.escapesService.escapeResource;

  filteredEscapes = computed<Escape[]>(() => {
    let activeFilter = this.filter();
    const filtered = activeFilter.offers.length || activeFilter.locationType || activeFilter.minRating != -1;
    return this.escapeResource.value()?.filter(escape =>
      !filtered ||
      (!activeFilter.locationType || activeFilter.locationType === escape.locationType) &&
      (!activeFilter.offers.length || activeFilter.offers.every(offer => escape.offers.includes(offer))) &&
      (escape.voting >= activeFilter.minRating)
    ) || []
  });

  filter = signal<Filter>({locationType: undefined, offers: [], minRating: -1})

  voteEscape(id: string, voting: number) {
    this.escapesService.vote(id, voting).subscribe(_ => this.escapeResource.reload());
  }
}
