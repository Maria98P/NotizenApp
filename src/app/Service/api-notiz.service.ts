import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiNotizService {
apiUrl: string ="http://127.0.0.1:8000/api/notizen";
  constructor( private http: HttpClient) { }
  getNotizen(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
  createNotiz(notiz:any){
    const headers= new HttpHeaders({
      'Content-Type':'application/ld+json',
      'Access-Control-Allow-Origin': '*',
    })
    return this.http.post<any>(`${this.apiUrl}/create`, notiz, { headers });
  }
  deleteNotiz(id:any){
    return this.http.delete<any>(`${this.apiUrl}/${id}/delete`, id);
  }
  updateNotiz(notiz: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.put<any>(`${this.apiUrl}/${notiz.id}/update`, notiz, { headers });
  }
  getNotiz(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
