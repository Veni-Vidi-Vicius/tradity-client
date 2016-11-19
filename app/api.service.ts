import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  
  private options: RequestOptions;
  private baseUrl = 'https://dev.tradity.de:443/api/v1';

  constructor(private http: Http, private router: Router) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: headers });

    let authToken = localStorage.getItem('authorizationToken');
    if (authToken) this.setAuthToken(authToken);
  }
  
  private handleError = (error: any) => {
    if (error.status == 401) {
      this.delAuthToken();
      this.router.navigateByUrl('login');
      return Observable.throw('Login required');
    }
    return Observable.throw('Unspecified api error');
  }
  
  setAuthToken(token: string) : void {
    this.options.headers.set('Authorization', token);
    localStorage.setItem('authorizationToken', token);
  }
  
  delAuthToken() : void {
    localStorage.removeItem('authorizationToken');
    this.options.headers.delete('Authorization');
  }
  
  get(url: string) : Observable<Response> {
    console.log('get request: ', url, ' headers: ', this.options.headers);
    return this.http.get(this.baseUrl + url, this.options).catch(this.handleError);
  }
  
  post(url: string, body: any) : Observable<Response> {
    console.log('get request: ', url, ' headers: ', this.options.headers);
    return this.http.post(this.baseUrl + url, JSON.stringify(body), this.options).catch(this.handleError);
  }
}