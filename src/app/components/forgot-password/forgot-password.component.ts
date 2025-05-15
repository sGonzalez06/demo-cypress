import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="forgot-password-container">
      <h2>Recuperar Contraseña</h2>
      <form (ngSubmit)="onSubmit()" #forgotPasswordForm="ngForm">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="email"
            required
            email
            #emailInput="ngModel"
            class="form-control"
          />
          <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="error-message">
            <div *ngIf="emailInput.errors?.['required']">El correo electrónico es requerido.</div>
            <div *ngIf="emailInput.errors?.['email']">Por favor, ingrese un correo electrónico válido.</div>
          </div>
        </div>
        <button type="submit" [disabled]="!forgotPasswordForm.form.valid">Enviar</button>
      </form>
      <div *ngIf="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div class="links">
        <a routerLink="/login">Volver al inicio de sesión</a>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .success-message {
      color: #28a745;
      text-align: center;
      margin-top: 1rem;
    }
    .links {
      text-align: center;
      margin-top: 1rem;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.email) {
      // Simulamos el envío del correo de recuperación
      setTimeout(() => {
        this.successMessage = 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }, 1000);
    }
  }
}