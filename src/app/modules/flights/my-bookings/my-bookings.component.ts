import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Bookings } from "../../../interfaces/common.interface"
import { CommonService } from '../../../services/common.service';
import { ApiService } from '../../../services/api.service';
import { API_PATH } from '../../../constants/api-end-points';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, CommonModule, ReactiveFormsModule, RouterModule, FormsModule, FlightCardComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit {

  bookings: Bookings[] = [];
  filteredBookings: Bookings[] = [];
  isLoading = true;
  activeFilter: 'all' | 'upcoming' | 'past' = 'all';
  searchQuery = '';

  constructor(
    public router: Router,
    private commonService: CommonService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getBookings();
  }


  /**
    * get search by filter data 
    */
  async getBookings(): Promise<any> {
    try {
      this.isLoading = true;
      this.commonService.showSpinner();
      const res$ = this.apiService.getReq(API_PATH.MY_BOOKINGS);
      let response: any = await lastValueFrom(res$);
      if (response && response.data) {
        this.bookings = response.data;
        this.filteredBookings = [...this.bookings];
        // console.log("my bookings", response.data)
      }
      this.commonService.hideSpinner();
      this.isLoading = false;
    } catch (error: any) {
      this.commonService.hideSpinner();
      if (error.error && error.error.message) {
        this.commonService.showError(error.error.message);
      } else {
        this.commonService.showError(error.message);
      }
    }
  }

  filterBookings(filter: 'all' | 'upcoming' | 'past'): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  searchBookings(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.searchQuery?.trim() && this.activeFilter === 'all') {
      this.filteredBookings = [...this.bookings];
      return;
    }

    this.filteredBookings = this.bookings.filter(booking => {
      // Search filter (only apply if searchQuery is not empty)
      const matchesSearch = !this.searchQuery?.trim() ||
        booking.flight.flightNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.flight.origin.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.flight.destination.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.passenger.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.passenger.lastName.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Status filter (only apply if activeFilter is not 'all')
      const matchesStatus = this.activeFilter === 'all' ||
        (this.activeFilter === 'upcoming' && booking.status === 'Booked') ||
        (this.activeFilter === 'past' && booking.status !== 'Booked');

      return matchesSearch && matchesStatus;
    });
  }


  viewBookingDetails(bookingId: string): void {
    // this.router.navigate(['/flight/details', bookingId]);
    console.log("view details")
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}
