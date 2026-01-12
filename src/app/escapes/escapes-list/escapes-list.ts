import {Component, effect, inject, signal} from '@angular/core';
import {MatCard, MatCardFooter, MatCardHeader} from '@angular/material/card';
import {CoordGoogleMapsPipe} from '../../shared/pipes/coord-google-maps-pipe';
import {CoordGoogleRoutePipe} from '../../shared/pipes/coord-google-route-pipe';
import {environment} from '../../../environments/environment';
import {TypeIcon} from '../../shared/type-icon/type-icon';
import {EscapesService} from '../../shared/escapes-service';
import {StarVoting} from '../../shared/star-voting/star-voting';

@Component({
  selector: 'ddkf-escapes-list',
  imports: [
    MatCard,
    MatCardHeader,
    CoordGoogleMapsPipe,
    CoordGoogleRoutePipe,
    TypeIcon,
    MatCardFooter,
    StarVoting
  ],
  templateUrl: './escapes-list.html',
  styleUrl: './escapes-list.scss',
})
export class EscapesList {

  readonly homeLocationCoordinates = environment.home;
  escapesService = inject(EscapesService)
  escapeResource = this.escapesService.escapeResource;

  constructor() {
  }

  voteEscape(id: string, voting: number) {
    this.escapesService.vote(id, voting).subscribe(_ => this.escapeResource.reload());
  }
}
