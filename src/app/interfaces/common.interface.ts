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
    id: string;
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
}

