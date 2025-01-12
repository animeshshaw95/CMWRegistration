import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('key', userData.email);
    var registrationUrl="registration?"+ params.toString();
    return this.http.post<any>(this.apiUrl+registrationUrl, userData);
  }
}
