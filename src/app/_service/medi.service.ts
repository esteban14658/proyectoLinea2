import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediService {
  private url : string = `${environment.HOST}/medico`;
  constructor(private http: HttpClient) { }

  lista() {
    return this.http.get<any>(`${this.url}/lista/0/1`)
  }
}
