import {Component, computed, effect, inject, input} from '@angular/core';
import {TracksService} from '../../shared/tracks-service';
import { Map, TileLayer} from 'leaflet';
// @ts-ignore
import { GPX } from 'leaflet-gpx';
import {Track} from '../../shared/models';
import {MatFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';

@Component({
  selector: 'ddkf-track-view',
  imports: [
    MatFabButton,
    RouterLink,
    MatIcon
  ],
  templateUrl: './track-view.html',
  styleUrl: './track-view.scss',
})
export class TrackView {

  trackService = inject(TracksService);
  location = inject(Location);

  id = input<string>('id')
  track = computed<Track>(() => this.trackService.trackResource.value()?.find(t => this.id() === t.id) || {} as Track)

  constructor() {
    effect(() => {
      const map = new Map('map');
      const view = this.track().coordinates.split(',') as any;
      map.setView(view, 14);
      new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
      }).addTo(map);

      // URL to your GPX file or the GPX itself as a XML string.
      const options = {
        async: false,
        polyline_options: { color: 'red' },
      };

      new GPX(this.track().gpx, options).on('loaded', (e:any) => {
        map.fitBounds(e.target.getBounds());
      }).addTo(map);
    });
  }
}
