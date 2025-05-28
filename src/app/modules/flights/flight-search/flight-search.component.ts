import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Flight } from '../../../interfaces/common.interface';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { CommonService } from '../../../services/common.service';
import { API_PATH } from '../../../constants/api-end-points';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-flight-search',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterModule, FlightCardComponent],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent implements OnInit {
  searchForm: FormGroup;
  flights: Flight[] = [];
  isLoading = false;
  searchPerformed = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      origin: [''],
      destination: [''],
      airline: [''],
      departureDateTime: [''],
      numberOfPassengers: ['']
    });
  }

  ngOnInit(): void {
    this.searchFlights();
  }

  // searchFlights() {
  //   if (this.searchForm.valid) {
  //     this.isLoading = true;
  //     this.searchPerformed = true;
  //   }
  // }
  goToMyBookings() {
    this.router.navigate(['/flight/my/bookings']);
  }


  clearSearch() {
    this.searchForm.reset();
    this.flights = [];
    this.searchPerformed = false;
    this.searchFlights();
  }

  /**
   * get search by filter data 
   */
  async searchFlights(): Promise<any> {
    try {
      let data = {
        ...this.searchForm.value
      }
      this.commonService.showSpinner();
      this.searchPerformed = true;
      const res$ = this.apiService.postReq(API_PATH.F_LIST, data);
      let response: any = await lastValueFrom(res$);
      if (response && response.data) {
        this.flights = response.data?.flights;
        // console.log("flights", this.flights)
      }
      this.commonService.hideSpinner();
    } catch (error: any) {
      this.commonService.hideSpinner();
      if (error.error && error.error.message) {
        this.commonService.showError(error.error.message);
      } else {
        this.commonService.showError(error.message);
      }
    }
  }

  openDatePicker(event: Event) {
    const input = event.target as HTMLInputElement;
    input.showPicker?.();
  }

}
