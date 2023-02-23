import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public headers:HttpHeaders= new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':"application/json",
    'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
    'Authorization':''
  });
  
  public getFeedsFromApi(pageSize:any) {
    console.log(pageSize)
    let params= new HttpParams();
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7995e40fad9046a8bb13e2b22ad30f7f&pageSize=${pageSize}`);
  }
}
