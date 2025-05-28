import { Component, Input } from '@angular/core';
import { Flight } from '../../../interfaces/common.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  imports: [CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  @Input() flight!: Flight;

  constructor(private router: Router) { }

  ngOnInit() {
    // console.log("input comes from", this.flight)
  }
  hasAvailableSeats(): boolean {
    return Number(this.flight.seatsAvailable) > 0;
  }

  getSeatsText(): string {
    const seats = Number(this.flight.seatsAvailable);
    if (seats <= 0) return 'Fully booked';
    return seats === 1 ? '1 seat left' : `${seats} seats left`;
  }

  bookFlight() {
    if (this.flight?._id) {
      this.router.navigate(['flight/book', this.flight._id]);
    } else {
      console.error('Flight ID is undefined. Cannot navigate.');
    }
  }

  viewDetails() {
    if (this.flight?._id) {
      this.router.navigate(['flight/details', this.flight._id]);
    } else {
      console.error('Flight ID is undefined. Cannot navigate.');
    }
  }

}
