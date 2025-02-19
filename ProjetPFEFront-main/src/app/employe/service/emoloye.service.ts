import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/employe';
import { Observable } from 'rxjs';
import { EmployeExistant } from '../model/EmployeExistant';
import { Site } from '../../site/model/site';
const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
});
@Injectable({
  providedIn: 'root'
})
export class EmoloyeService {

  private apiUrl = 'http://localhost:9090/api/employes';
  
  private apiUrl2 = 'http://localhost:9090/api/sites'; 
  constructor(private http: HttpClient) {}

  addEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(this.apiUrl, employe, { headers });
  }

  getAllEmployes(): Observable<EmployeExistant[]> {
    return this.http.get<EmployeExistant[]>(`${this.apiUrl}`);
  }
 getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl2, { headers });
  }
  getAllEmployesActif(): Observable<Employe[]> {
    return this.http.get<Employe[]>(this.apiUrl);
  }

}
