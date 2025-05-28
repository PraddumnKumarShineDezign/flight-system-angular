import { Routes } from "@angular/router";
import { FlightSearchComponent } from "./flight-search/flight-search.component";
import { FlightBookingComponent } from "./flight-booking/flight-booking.component";
import { FlightDetailsComponent } from "./flight-details/flight-details.component";
import { MyBookingsComponent } from "./my-bookings/my-bookings.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
    },
    {
        path: 'search',
        component: FlightSearchComponent
    },
    {
        path: 'book/:id',
        component: FlightBookingComponent
    },
    {
        path: 'details/:id',
        component: FlightDetailsComponent
    },
    {
        path: 'my/bookings',
        component: MyBookingsComponent
    }
];