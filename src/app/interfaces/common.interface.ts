export interface ApiResponse {
    api_response: string,
    message: string,
    status_code: string
}

export interface UserDetails {
    email: string,
    firstName: string,
    lastName: string,
    permissions: string[],
    roleId: string,
    role: string,
    id: string

}

export interface Flight {
    _id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    stops: number;
    departureDateTime: string;
    arrivalDateTime: string;
    seatsAvailable: Number;
    destinationCode: string;
    departureDate: string;
    arrivalDate: string;
    availableSeats: number;
    aircraftType: string;
    aircraftRegistration: string;
    seatConfiguration: string;
    departureGate?: string;
    arrivalGate?: string;
    checkInCounter?: string;
    checkInCloses: string;
    status: 'On Time' | 'Delayed' | 'Cancelled';
    statusMessage?: string;
    baggageAllowance: string;
    amenities: Amenity[];
}



export interface Amenity {
    name: string;
    icon: string;
    description: string;
}

export interface Booking {
    id?: string;
    flightId: string;
    passengerDetails: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        passport: string;
    };
    paymentDetails: {
        paymentMethod: string;
        cardNumber: string;
        expiryDate: string;
        cvv: string;
    };
    seats: number;
    specialRequests?: string;
    totalPrice: number;
    bookingDate?: string;
    bookingReference?: string;
}
export interface Bookings {
    _id: string;
    userId: string;
    seats: number;
    specialRequests: string;
    totalAmount: number;
    status: string;
    bookingDate: string;
    flight: {
        flightNumber: string;
        origin: string;
        destination: string;
    };
    passenger: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        passport: string;
    };
    payment: {
        paymentMethod: string;
        cardNumber: string;
        expiryDate: string;
    };
}
