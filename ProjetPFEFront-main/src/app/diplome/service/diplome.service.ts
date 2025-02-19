import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diplome } from '../model/diplome';
import { DiplomeRequest } from '../model/diplome-request';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  private baseUrl = 'http://localhost:9090/diplomes';
  headers : any;
  constructor(private http: HttpClient, private authservice: AuthService) {
    this.headers = this.authservice.createAuthorizationHeader();
  }
  
  getAllDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`${this.baseUrl}/all` , { headers: this.headers });
  }

  addDiplome(diplome: Diplome): Observable<Diplome> {
    return this.http.post<Diplome>(`${this.baseUrl}/${diplome.typeDiplome.id}`, diplome , { headers: this.headers });
  }

  getDiplomeById(id: number): Observable<Diplome> {
    return this.http.get<Diplome>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  updateDiplome(id: number, diplomeRequest: DiplomeRequest): Observable<Diplome> {
    return this.http.put<Diplome>(`${this.baseUrl}/${id}`, diplomeRequest, { headers: this.headers });
  }
  

  deleteDiplome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}