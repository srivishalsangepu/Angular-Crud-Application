import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http:HttpClient) { }
  host_url:any = "http://localhost:57646/api/";

getUsers():Observable<any>{
  return this.http.get(`${this.host_url}userscruds`);
}
insertUser(formData):Observable<any>{
  return this.http.post(`${this.host_url}userscruds`, formData);
}
updateUser(id,Data):Observable<any>{
  return this.http.put(`${this.host_url}userscruds/${id}`,Data);
}
deleteUser(id):Observable<any>{
  return this.http.delete(`${this.host_url}userscruds/${id}`);
}
}
