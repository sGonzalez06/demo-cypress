import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="homepage-container">
      <h1 data-cy="welcome-message">¡Bienvenido!</h1>
      <p>Has iniciado sesión correctamente.</p>
      <div class="button-container">
        <button (click)="navigateToProfile()" data-cy="profile-button">Ver Perfil</button>
        <button (click)="logout()" data-cy="logout-button">Cerrar Sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .homepage-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      text-align: center;
    }
    .button-container {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    [data-cy="profile-button"] {
      background-color: #2196F3;
      color: white;
    }
    [data-cy="profile-button"]:hover {
      background-color: #0b7dda;
    }
    [data-cy="logout-button"] {
      background-color: #f44336;
      color: white;
    }
    [data-cy="logout-button"]:hover {
      background-color: #d32f2f;
    }
  `]
})
export class HomepageComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}