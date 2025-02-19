import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../model/site';
import { SiteRequest } from '../model/site.dto';
import { Poste } from '../../poste/model/poste';
const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('jwt')
});
@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = 'http://localhost:9090/api/sites';

  private apiUrll = 'http://localhost:9090/recrutement/postes';

  constructor(private http: HttpClient) { }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.apiUrl}/non-archives`, { headers });
  }

/*  ajouterSite(site: Site): Observable<Site> {
    return this.http.post<Site>(`${this.apiUrl}/ajouter`, site, { headers });
  }
*/


ajouterSite(site: Site): Observable<Site> {
  return this.http.post<Site>(`${this.apiUrl}/add`, site);
}
  
  deleteSite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  archiverSite(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/archiver`, {});
  }

  getAllDirectionsArchivés(): Observable<Site[]> {
        return this.http.get<Site[]>(`${this.apiUrll}/liste-sites-archivés`, { headers });
      }


      getAllPostes(): Observable<Poste[]> {
        return this.http.get<Poste[]>(`${this.apiUrll}`, { headers });
      }






      desarchiverSite(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/desarchiver`, {});
      }


      getDirections(siteId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${siteId}/directions`);
      }
      getPostesBySiteId(siteId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${siteId}/postes`);
      }


      updateSite(id: number, updatedSite: SiteRequest): Observable<any> {
        const url = `${this.apiUrl}/${id}`;  // Construire l'URL avec l'ID du site
        return this.http.put(url, updatedSite); // Faire l'appel HTTP PUT
      }
  
}
