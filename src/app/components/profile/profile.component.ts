import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

interface UserProfile {
  username: string;
  email: string;
  fullName: string;
  bio: string;
}

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-container">
      <h1 data-cy="profile-title">Perfil de Usuario</h1>
      
      <div *ngIf="!isEditing" class="profile-view" data-cy="profile-view">
        <div class="profile-info">
          <h2>{{ userProfile.fullName }}</h2>
          <p><strong>Usuario:</strong> {{ userProfile.username }}</p>
          <p><strong>Email:</strong> {{ userProfile.email }}</p>
          <p><strong>Biografía:</strong> {{ userProfile.bio }}</p>
        </div>
        <div class="profile-actions">
          <button (click)="toggleEdit()" data-cy="edit-profile-button">Editar Perfil</button>
          <button (click)="navigateToHome()" data-cy="back-button">Volver al Inicio</button>
        </div>
      </div>

      <div *ngIf="isEditing" class="profile-edit" data-cy="profile-edit">
        <form (ngSubmit)="saveProfile()">
          <div class="form-group">
            <label for="fullName">Nombre Completo:</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              [(ngModel)]="editedProfile.fullName" 
              required 
              data-cy="fullname-input">
            <div *ngIf="errors['fullName']" class="error-message" data-cy="error-message">
              {{ errors['fullName'] }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="editedProfile.email" 
              required 
              data-cy="email-input">
            <div *ngIf="errors['email']" class="error-message" data-cy="error-message">
              {{ errors['email'] }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="bio">Biografía:</label>
            <textarea 
              id="bio" 
              name="bio" 
              [(ngModel)]="editedProfile.bio" 
              (input)="updateCharCount()" 
              rows="4" 
              data-cy="bio-input"></textarea>
            <div class="char-counter" [ngClass]="{'char-limit-warning': isApproachingLimit, 'char-limit-exceeded': isExceeded}" data-cy="bio-char-counter">
              {{ bioCharCount }}/200 caracteres
            </div>
            <div *ngIf="errors['bio']" class="error-message" data-cy="error-message">
              {{ errors['bio'] }}
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" data-cy="save-profile-button">Guardar Cambios</button>
            <button type="button" (click)="cancelEdit()" data-cy="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>

      <div *ngIf="successMessage" class="success-message" data-cy="success-message">
        {{ successMessage }}
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .profile-info {
      margin-bottom: 20px;
    }
    .profile-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[data-cy="edit-profile-button"], button[data-cy="save-profile-button"] {
      background-color: #4CAF50;
      color: white;
    }
    button[data-cy="back-button"], button[data-cy="cancel-button"] {
      background-color: #f44336;
      color: white;
    }
    .error-message {
      color: #f44336;
      margin-top: 5px;
      font-size: 0.9em;
    }
    .success-message {
      color: #4CAF50;
      margin-top: 15px;
      padding: 10px;
      background-color: #e8f5e9;
      border-radius: 4px;
      text-align: center;
    }
    .char-counter {
      font-size: 0.85em;
      text-align: right;
      margin-top: 5px;
      color: #666;
    }
    .char-limit-warning {
      color: #ff9800;
    }
    .char-limit-exceeded {
      color: #f44336;
      font-weight: bold;
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {
    username: '',
    email: '',
    fullName: '',
    bio: ''
  };
  
  editedProfile: UserProfile = {
    username: '',
    email: '',
    fullName: '',
    bio: ''
  };
  
  isEditing = false;
  successMessage = '';
  errors: Record<string, string> = {};
  bioCharCount = 0;
  isApproachingLimit = false;
  isExceeded = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfile = this.userService.getUserProfile();
    this.resetEditedProfile();
  }

  resetEditedProfile(): void {
    this.editedProfile = { ...this.userProfile };
    this.updateCharCount();
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.resetEditedProfile();
    this.clearMessages();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.errors = {};
    this.editedProfile = { ...this.userProfile };
    // Asegurar que la vista del perfil esté visible después de cancelar
    setTimeout(() => {
      this.isEditing = false;
    }, 0);
  }

  saveProfile(): void {
    this.clearMessages();
    
    if (this.validateForm()) {
      const success = this.userService.updateUserProfile(this.editedProfile);
      
      if (success) {
        this.userProfile = { ...this.editedProfile };
        this.isEditing = false;
        this.successMessage = 'Perfil actualizado correctamente';
      }
    }
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;
    
    if (!this.editedProfile.fullName.trim()) {
      this.errors['fullName'] = 'El nombre completo es obligatorio';
      isValid = false;
    }
    
    if (!this.editedProfile.email.trim()) {
      this.errors['email'] = 'El email es obligatorio';
      isValid = false;
    } else if (!this.isValidEmail(this.editedProfile.email)) {
      this.errors['email'] = 'El formato del email no es válido';
      isValid = false;
    }
    
    if (this.editedProfile.bio.length > 200) {
      this.errors['bio'] = 'La biografía no puede exceder los 200 caracteres';
      isValid = false;
    }
    
    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errors = {};
  }

  updateCharCount(): void {
    this.bioCharCount = this.editedProfile.bio.length;
    this.isApproachingLimit = this.bioCharCount >= 160 && this.bioCharCount <= 200;
    this.isExceeded = this.bioCharCount > 200;
  }

  navigateToHome(): void {
    this.router.navigate(['/homepage']);
  }
}