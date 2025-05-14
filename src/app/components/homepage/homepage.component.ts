import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="homepage-container">
      <h1 data-cy="welcome-message">¡Bienvenido!</h1>
      <p>Has iniciado sesión correctamente.</p>
      <button (click)="logout()" data-cy="logout-button">Cerrar Sesión</button>
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
    button {
      background-color: #f44336;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      background-color: #d32f2f;
    }
  `]
})
export class HomepageComponent {
  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}