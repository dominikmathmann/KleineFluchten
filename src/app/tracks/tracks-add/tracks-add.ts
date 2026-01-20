import {Component, inject, signal} from '@angular/core';
import {Field, form, required} from '@angular/forms/signals';
import {TrackAdd, TrackAttribute} from '../../shared/models';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {TypeIcon} from '../../shared/type-icon/type-icon';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {TracksService} from '../../shared/tracks-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ddkf-tracks-add',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    Field,
    MatCheckbox,
    TypeIcon,
    MatButton,
    JsonPipe
  ],
  templateUrl: './tracks-add.html',
  styleUrl: './tracks-add.scss',
})
export class TracksAdd {

  tracksService = inject(TracksService);
  router = inject(Router);

  track = signal<TrackAdd>({
    image: '',
    length: '',
    coordinates: '',
    gpx: '',
    notes: '',
    title: '',
    url: '',
    attributes: Object.values(TrackAttribute).map(attribute => ({attribute, offered: false}))
  })
  form = form(this.track, (schema) => {
    required(schema.title);
    required(schema.gpx);
  })

  submit() {
    this.tracksService.saveTrack(this.track()).subscribe(() => {
      this.tracksService.trackResource.reload();
      this.router.navigateByUrl('/list-tracks');
    });
  }

  handleFileInput(files: any) {
    const file: File = files[0];
    file.text().then(c => {
      const lats = /trkpt lat="(.*?)" lon="(.*?)"/g.exec(c)

      this.track.update(t => {
        t.coordinates = `${lats?.[1]},${lats?.[2]}`
        t.gpx = c.trim();
        return t;
      })
    })
  }
}
