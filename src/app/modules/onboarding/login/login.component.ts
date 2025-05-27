import { Component } from "@angular/core";
import { RouterLink, Router, RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false]
        });
    }

    ngOnInit(): void {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            this.loginForm.patchValue({
                email: savedEmail,
                rememberMe: true
            });
        }
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.markFormGroupTouched(this.loginForm);
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const { email, password, rememberMe } = this.loginForm.value;

        // Save email if "remember me" is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // Simulate API call
        setTimeout(() => {
            this.isLoading = false;
            // Replace with actual authentication logic
            if (email === 'demo@example.com' && password === 'Password123') {
                this.router.navigate(['/dashboard']);
            } else {
                this.errorMessage = 'Invalid email or password';
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

    // get email() { return this.loginForm.get('email'); }
    // get password() { return this.loginForm.get('password'); }
    get f() {
        return this.loginForm.controls;
    }

}