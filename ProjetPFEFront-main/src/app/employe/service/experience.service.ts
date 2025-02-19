import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private baseUrl = 'http://localhost:9090/api/experiences'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Ajouter une expérience antérieure
  addExperienceAnterieure(employeId: number, experience: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/anterieure/${employeId}`, experience);
  }

  // Ajouter une expérience Assad
  addExperienceAssad(employeId: number, experience: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/assad/${employeId}`, experience);
  }

  // Modifier une expérience Assad
  modifyExperienceAssad(id: number, experience: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/assad/${id}`, experience);
  }

  // Modifier une expérience antérieure
  modifyExperienceAnterieure(id: number, experience: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/anterieure/${id}`, experience);
  }

  // Récupérer les expériences Assad pour un employé
  getExperiencesAssad(employeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assad/${employeId}`);
  }

  // Récupérer les expériences antérieures pour un employé
  getExperiencesAnterieure(employeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/anterieure/${employeId}`);
  }
  deleteExperienceAssad(employeId: number, experienceId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/experienceAssad/${employeId}/${experienceId}`);
  }
  
  deleteExperienceAnterieure(employeId: number, experienceId: number): Observable<void> {
    return this.http.delete<void>(`/api/experiences/experienceAnterieure/${employeId}/${experienceId}`);
  }
  



}
