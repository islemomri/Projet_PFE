import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDiplome } from '../model/type-diplome';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDiplomeService {
  private apiUrl = 'http://localhost:9090/typediplomes';

  constructor(private http: HttpClient) {}

  getAllTypeDiplomes(): Observable<TypeDiplome[]> {
    return this.http.get<TypeDiplome[]>(`${this.apiUrl}/all`);
  }

  getTypeDiplomeById(id: number): Observable<TypeDiplome> {
    return this.http.get<TypeDiplome>(`${this.apiUrl}/${id}`);
  }

  addTypeDiplome(typeDiplome: TypeDiplome): Observable<TypeDiplome> {
    return this.http.post<TypeDiplome>(`${this.apiUrl}/add`, typeDiplome);
  }

  updateTypeDiplome(id: number, typeDiplome: TypeDiplome): Observable<TypeDiplome> {
    return this.http.put<TypeDiplome>(`${this.apiUrl}/${id}`, typeDiplome);
  }

 

  archiverTypeDiplome(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/archiver/${id}`, {});
  }
getAllTypeDiplome(): Observable<TypeDiplome[]> {
      return this.http.get<TypeDiplome[]>(this.apiUrl);
    }


    getAllTypeDiplomearchive(): Observable<TypeDiplome[]> {
      return this.http.get<TypeDiplome[]>(`${this.apiUrl}/getallTypeDiplomeArchives`);
    }


    desarchiverTypeDiplome(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/desarchiver/${id}`, {});
    }

}