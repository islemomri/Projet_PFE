import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../model/poste';


@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private apiUrl = `http://localhost:9090/recrutement/postes`; // Remplace `apiUrl` par l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Ajouter un poste
  ajouterPoste(poste: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, poste);
  }

  // Récupérer tous les postes
  getAllPostes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un poste par ID
  getPosteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un poste
  updatePoste(id: number, updatedPoste: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedPoste);
  }

  // Supprimer un poste
  
  getAllPostesnonArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/getAllPostesnonArchivés`);
  }

 
  getAllPostesArchives(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/liste-Postes-archivés`);
  }

  // 🔹 Archiver un poste
  archiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/archiver`, {});
  }

  // 🔹 Désarchiver un poste
  desarchiverPoste(id: number): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/${id}/desarchiver`, {});
  }


}
