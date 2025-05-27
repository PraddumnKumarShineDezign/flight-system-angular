import { Component } from "@angular/core";
import { RouterLink, Router, RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterModule],
    standalone: true,
    templateUrl: './forgotPassword.component.html',
    selector: 'app-forgot-password',
    styleUrl: './forgotPassword.component.scss'
})
export class ForgotPasswordComponent {
    forgotForm: FormGroup;
    isLoading = false;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void { }

    onSubmit(): void {
        if (this.forgotForm.invalid) {
            this.markFormGroupTouched(this.forgotForm);
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;
        this.successMessage = null;

        const { email } = this.forgotForm.value;

        // Simulate API call
        setTimeout(() => {
            this.isLoading = false;
            // Replace with actual password reset logic
            if (email === 'demo@example.com') {
                this.successMessage = 'Password reset link has been sent to your email';
            } else {
                this.errorMessage = 'No account found with this email address';
            }
        }, 1500);
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    get email() { return this.forgotForm.get('email'); }
}