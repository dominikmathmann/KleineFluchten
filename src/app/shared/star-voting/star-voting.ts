import {Component, computed, effect, input, output, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'ddkf-star-voting',
  imports: [
    MatIcon
  ],
  templateUrl: './star-voting.html',
  styleUrl: './star-voting.scss',
})
export class StarVoting {

  voting = input.required<number>();
  voted = output<number>();

  givenStars = computed(() => new Array(5).fill(false).map((_, i) => i <= this.voting()));
  hoverCount = signal<number>(-1);
}
