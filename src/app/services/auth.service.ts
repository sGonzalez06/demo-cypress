import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private readonly validEmail = 'test@example.com';

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // Credenciales hardcodeadas para la demo
    if (username === 'test' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  requestPasswordReset(email: string): boolean {
    // Simulación de verificación de correo electrónico
    return email === this.validEmail;
  }
}