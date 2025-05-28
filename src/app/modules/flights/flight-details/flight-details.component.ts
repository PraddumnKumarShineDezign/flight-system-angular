import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../interfaces/common.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../services/common.service';
import { API_PATH } from '../../../constants/api-end-points';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent implements OnInit {
  flight!: Flight;
  isLoading = false;
  activeTab = 'details';
  flightId: string = "";
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private apiService: ApiService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id') || "";
    if (this.flightId) {
      this.getFlightDetails();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  bookFlight() {
    this.router.navigate(['/book', this.flight._id]);
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
}