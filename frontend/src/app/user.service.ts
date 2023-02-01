import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from './user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: any;
  httpClient: any;
  constructor(private http: HttpClient, private route: Router) {}

  //CONNEXION
  login(user: any) {
    return this.http.post('http://localhost:3000/endpoint/test', user);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }
  // DECONNEXION
  logout() {
    //remove user from localStorage
    localStorage.clear(); //delete all user connected information, into token
    this.route.navigate(['/']);
    // this.currentUserSubject.next(null);
  }
  //Here we have user adding
  addUser(user: any) {
    return this.http.post('http://localhost:3000/endpoint/addUser', user);
  }

  //Here we have user listing
  listUser() {
    return this.http.get('http://localhost:3000/endpoint/ ');
  }
  //Here we have user température et pression
  listTempHum() {
    return this.http.get('http://localhost:3000/endpoint/temp ');
  }



  //Here we have user deleting
  deleteUser(id: any) {
    return this.http.delete('http://localhost:3000/endpoint/deleteUser/' + id);
  }
  ajout(user: User) {
    return this.http.post('http://localhost:3000/endpoint/post', user);
  }

  //Here we have user updating
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(
      'http://localhost:3000/endpoint/updateUser/' + id,
      data
    );
    // .pipe(catchError(this.handleError));
  }

  updatePassword(id: any, data: any): Observable<any> {
    console.log(id);

    console.log(data);

    let API_URL = `${this.endpoint}/updateUser/${id}`;

    return this.http.patch(`http://localhost:3000/endpoint/updateUser/${id}`, {"actuelPass": data.actuelPass,
  "newPass":data.newPass})
  }
}
