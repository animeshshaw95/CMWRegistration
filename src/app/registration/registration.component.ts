import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  currentStep = 0;
  submitted = false;
  loading = false;
  apiErrorMessage = '';
  states = ['California', 'New York', 'Texas', 'Florida']; // Example states

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      state: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      subscribe: [false]
    }, { validators: this.emailMatchValidator });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  emailMatchValidator(group: FormGroup) {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.apiErrorMessage = ''; 

    this.registrationService.register(this.registrationForm.value).subscribe(
      () => {
        this.currentStep = 1;
      },
      (error) => {
        this.apiErrorMessage = error.error.message || 'An error occurred during registration.';
        
        setTimeout(() => {
          this.apiErrorMessage = '';
        }, 5000);
      }
    );
  }
}
