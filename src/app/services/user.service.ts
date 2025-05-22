import { Injectable } from '@angular/core';

interface UserProfile {
  username: string;
  email: string;
  fullName: string;
  bio: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfile: UserProfile = {
    username: 'test',
    email: 'test@example.com',
    fullName: 'Usuario de Prueba',
    bio: 'Esta es una biografía de ejemplo para el usuario de prueba.'
  };

  constructor() { }

  getUserProfile(): UserProfile {
    return { ...this.userProfile };
  }

  updateUserProfile(profile: UserProfile): boolean {
    // Validaciones básicas
    if (!profile.fullName || !profile.email) {
      return false;
    }

    // Mantener el nombre de usuario igual (no se puede cambiar)
    profile.username = this.userProfile.username;
    
    // Actualizar el perfil
    this.userProfile = { ...profile };
    return true;
  }
}