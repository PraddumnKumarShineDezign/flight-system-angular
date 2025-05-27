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

