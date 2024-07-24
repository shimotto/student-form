import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getPaginatedData(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`/api/data?page=${page}&pageSize=${pageSize}`);
  }
}

