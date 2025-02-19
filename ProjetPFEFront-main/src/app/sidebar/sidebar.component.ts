import { Component, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonModule, BadgeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
})
export class SidebarComponent  implements OnInit{
  userRole: string | null = null;
  constructor(private authService:AuthService){
    
  }
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  isRH(): boolean {
     
    return this.userRole === 'RH';
  }
  

  isAdmin(): boolean {
    
    return this.userRole === 'ADMIN';
  }

  isDirecteur(): boolean {
    return this.userRole === 'DIRECTEUR';
  }

  logout() {
    this.authService.logout();
  }

}