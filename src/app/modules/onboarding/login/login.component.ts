import { Component } from "@angular/core";
import { RouterLink, Router, RouterModule, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../../services/auth.service";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { SETTINGS } from "../../../constants/constants";
import { API_PATH } from "../../../constants/api-end-points";
import { lastValueFrom } from "rxjs";
import * as Model from "../../../interfaces/common.interface";

@Component({
    imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
    standalone: true
    , templateUrl: './login.component.html',
    selector: 'app-login',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage: string | null = null;
    userDetails: any = {};
    showPassword: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private apiService: ApiService,
        private commonService: CommonService,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false]
        });
    }

    ngOnInit(): void {
        this.checkUserDetails();
    }

    get f() {
        return this.loginForm.controls;
    }


    saveUserDetails(response: any): void {
        const userData: Model.UserDetails = {
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            permissions: response.data.permissions,
            roleId: response.data.roleId,
            role: response.data.role,
            id: response.data._id,
        };
        const en = this.authService.encrypt(JSON.stringify(userData));
        localStorage.setItem(SETTINGS.USER_DETAILS, en);
        localStorage.setItem(SETTINGS.TOKEN_KEY, response.data.token);
        this.getUserDetails();
    }
    getUserDetails() {
        let ud = this.authService.getUserDetails();
        if (ud) {
            this.userDetails = ud;
        }
    }

    async submitLogin(): Promise<void> {
        this.loginForm.markAllAsTouched();
        try {
            if (this.loginForm.valid) {
                this.commonService.showSpinner();
                const { email, password, rememberMe } = this.loginForm.value;
                let data = {
                    email: email,
                    password: password,
                };
                const response$ = this.apiService.postReq(API_PATH.LOGIN, data);
                const response = await lastValueFrom(response$);
                this.saveUserDetails(response);
                this.commonService.showSuccess(response.message);
                if (response && response.data) {
                    if (rememberMe) {
                        const enc = this.authService.encrypt(JSON.stringify(data));
                        localStorage.setItem(SETTINGS.USER_CREDENTIALS, enc);
                    } else {
                        localStorage.removeItem(SETTINGS.USER_CREDENTIALS);
                    }
                    this.router.navigate(['/flight'])
                }
                this.commonService.hideSpinner();
            }
        } catch (error: any) {
            this.commonService.hideSpinner();
            if (error.error && error.error.message) {
                this.commonService.showError(error.error.message);
            } else {
                this.commonService.showError(error.message);
            }
        }
    }

    checkUserDetails(): void {
        try {
            let userCredentials = localStorage.getItem(SETTINGS.USER_CREDENTIALS);
            if (userCredentials) {
                let uc: any = this.authService.decrypt(userCredentials);
                if (uc) {
                    uc = JSON.parse(uc);
                    if (uc.email && uc.password) {
                        this.loginForm.patchValue({
                            email: uc.email,
                            password: uc.password,
                            rememberMe: true,
                        });
                    }
                }
            }
        } catch (error: any) {
            this.commonService.showError(error.message);
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }


}