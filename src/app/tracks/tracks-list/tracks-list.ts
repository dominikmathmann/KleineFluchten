import {Component, inject} from '@angular/core';
import {CoordGoogleMapsPipe} from '../../shared/pipes/coord-google-maps-pipe';
import {CoordGoogleRoutePipe} from '../../shared/pipes/coord-google-route-pipe';
import {EscapesFilter} from '../../escapes/escapes-list/escapes-filter/escapes-filter';
import {MatCard, MatCardFooter, MatCardHeader} from '@angular/material/card';
import {MatFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {StarVoting} from '../../shared/star-voting/star-voting';
import {TypeIcon} from '../../shared/type-icon/type-icon';
import {environment} from '../../../environments/environment';
import {TracksService} from '../../shared/tracks-service';
import {Track} from '../../shared/models';
import {download} from '../../shared/utils';

@Component({
  selector: 'ddkf-tracks-list',
  imports: [
    CoordGoogleMapsPipe,
    CoordGoogleRoutePipe,
    EscapesFilter,
    MatCard,
    MatCardFooter,
    MatCardHeader,
    MatFabButton,
    RouterLink,
    StarVoting,
    TypeIcon
  ],
  templateUrl: './tracks-list.html',
  styleUrl: './tracks-list.scss',
})
export class TracksList {
  readonly homeLocationCoordinates = environment.home;

  trackService = inject(TracksService);
  trackResource = this.trackService.trackResource;

  download(track: Track){
    download(`${track.title}.gpx`, track.gpx, 'application/gpx+xml');
  }
}
