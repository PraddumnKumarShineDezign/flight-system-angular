import { Component, Input } from '@angular/core';
import { Flight } from '../../../interfaces/common.interface';


@Component({
  selector: 'app-flight-card',
  imports: [],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  @Input() flight!: Flight;

  ngOnInit() {
    console.log("input comes from", this.flight)
  }
}
