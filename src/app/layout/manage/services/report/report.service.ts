import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../../model/report/report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  
  apiUrl: string = environment.API_REPORTS;

  constructor(private http: HttpClient) { }

  postReport(report : Report) {
    return this.http.post<any>(`${this.apiUrl}/reports`, report);
  }

  getReports(ownerId: string) {
    return this.http.get<any>(`${this.apiUrl}/reports/filter?veterinarianId=${ownerId}`, this.httpOptions)
  }

  getEcgData(dogId) {
    return this.http.get<any>(`${this.apiUrl}/ecg-data/${dogId}/last-5-minutes-record`, this.httpOptions)
  }

  getPulseData(dogId) {
    return this.http.get<any>(`${this.apiUrl}/pulse-data/${dogId}/last-5-minutes-record`, this.httpOptions)
  }

}
