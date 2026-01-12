import {Component, inject, signal} from '@angular/core';
import {Field, form, required} from '@angular/forms/signals';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {EscapeStore} from '../../shared/escapes-store';
import {EscapeAdd, LocationType, Offer} from '../../shared/models';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {TypeIcon} from '../../shared/type-icon/type-icon';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'ddkf-escapes-add',
  imports: [
    Field,
    MatFormField,
    MatInput,
    MatButtonModule,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    TypeIcon,
    MatCheckbox
  ],
  templateUrl: './escapes-add.html',
  styleUrl: './escapes-add.scss',
})
export class EscapesAdd {
    escapeAddStore = inject(EscapeStore);

    escape = signal<EscapeAdd>({
      title: '',
      url: '',
      image: '',
      notes: '',
      locationType: '',
      coordinates: '',
      offers: Object.values(Offer).map(offerType => ({offerType, offered: false}))
    })

    escapeForm = form(this.escape, (schema) => {
      required(schema.title);
      required(schema.coordinates);
    });

    router = inject(Router);

    readonly typeOptions = Object.values(LocationType);

  submit() {

    this.escapeAddStore.saveEscape({value: this.escape(), onComplete: () => this.router.navigateByUrl('/')});
  }
}
