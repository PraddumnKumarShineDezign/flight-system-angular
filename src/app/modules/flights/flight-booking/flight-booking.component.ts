import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Flight } from '../../../interfaces/common.interface';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { CommonService } from '../../../services/common.service';
import { API_PATH } from '../../../constants/api-end-points';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-flight-booking',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FlightCardComponent],
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.scss'
})
export class FlightBookingComponent implements OnInit {
  bookingForm: FormGroup;
  flight!: Flight;
  isLoading = false;
  flightId: string = "";
  paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService,
    private commonService: CommonService
  ) {
    this.bookingForm = this.fb.group({
      passengerDetails: this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        passport: ['', Validators.required]
      }),
      paymentDetails: this.fb.group({
        paymentMethod: ['Credit Card', Validators.required],
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
      }),
      seats: [1, [Validators.required, Validators.min(1)]],
      specialRequests: ['']
    });
  }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id') || "";
    if (this.flightId) {
      this.getFlightDetails();
    }
    // F_DETAILS
  }

  /**
   * @description get flight details by flight id
   */
  async getFlightDetails(): Promise<void> {
    try {
      this.commonService.showSpinner();
      const res$ = this.apiService.getReq(`${API_PATH.F_DETAILS}/${this.flightId}`);
      let response: any = await lastValueFrom(res$);
      if (response && response.data) {
        this.flight = response.data;
        // console.log("submit form", this.flight)
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

  async onSubmit() {
    try {
      this.bookingForm.markAllAsTouched();
      if (!this.bookingForm.valid) {
        this.commonService.showError("Please fill all required fields correctly.");
        return;
      }

      this.isLoading = true;
      this.commonService.showSpinner();

      const formValue = this.bookingForm.value;

      const bookingData = {
        flightId: this.flight._id,
        seats: formValue.seats,
        specialRequests: formValue.specialRequests || "",
        passengerDetails: formValue.passengerDetails,
        paymentDetails: formValue.paymentDetails,
        totalPrice: this.flight.price * formValue.seats
      };

      // console.log("Submitting booking data:", bookingData);

      const res$ = this.apiService.postReq(API_PATH.F_BOOK, bookingData);
      const response = await lastValueFrom(res$);

      if (response?.message) {
        this.commonService.showSuccess(response.message);
        this.bookingForm.reset();
        this.router.navigate([`/flight`]);
      }

    } catch (error: any) {
      if (error?.error?.message) {
        this.commonService.showError(error.error.message);
      } else {
        this.commonService.showError(error.message || "Something went wrong.");
      }
    } finally {
      this.isLoading = false;
      this.commonService.hideSpinner();
    }
  }


  get passengerDetails() {
    return this.bookingForm.get('passengerDetails') as FormGroup;
  }

  get paymentDetails() {
    return this.bookingForm.get('paymentDetails') as FormGroup;
  }
}
