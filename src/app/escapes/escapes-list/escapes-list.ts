import {Component, inject} from '@angular/core';
import {EscapeStore} from '../../shared/escapes-store';
import {JsonPipe} from '@angular/common';
import {MatCard, MatCardFooter, MatCardHeader} from '@angular/material/card';
import {CoordGoogleMapsPipe} from '../../shared/pipes/coord-google-maps-pipe';
import {CoordGoogleRoutePipe} from '../../shared/pipes/coord-google-route-pipe';
import {environment} from '../../../environments/environment';
import {TypeIcon} from '../../shared/type-icon/type-icon';

@Component({
  selector: 'ddkf-escapes-list',
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    CoordGoogleMapsPipe,
    CoordGoogleRoutePipe,
    TypeIcon,
    MatCardFooter
  ],
  templateUrl: './escapes-list.html',
  styleUrl: './escapes-list.scss',
})
export class EscapesList {

  readonly homeLocationCoordinates = environment.home;
  escapeStore = inject(EscapeStore)
}
