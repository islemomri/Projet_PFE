import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direction } from '../model/Direction';
const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
});
@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private apiUrl = 'http://localhost:9090/api/directions'; 
  constructor(private http: HttpClient) { }

  ajouterDirection(direction: Direction): Observable<Direction> {
    return this.http.post<Direction>(`${this.apiUrl}/ajouter`, direction);
  }

   getAllDirections(): Observable<Direction[]> {
      return this.http.get<Direction[]>(this.apiUrl, { headers });
    }


    getAllDirectionsArchivés(): Observable<Direction[]> {
      return this.http.get<Direction[]>(`${this.apiUrl}/liste-directions-archivés`, { headers });
    }


    desarchiverDirection(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}/desarchiver`, {});
    }

    archiverDirection(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}/archiver`, {});
    }

      updateDirection(id: number, direction: Direction): Observable<Direction> {
        return this.http.put<Direction>(`${this.apiUrl}/${id}`, direction , { headers });
      }

}
