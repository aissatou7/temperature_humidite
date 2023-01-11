import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   // Http Header
   httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }


  //Here we have user adding
  /* addUser(user:any){
       return this.http.post('http://localhost:2000/endpoint/post', user);
  }
 */

  ajout(user:User){
    return this.http.post('http://localhost:2000/endpoint/post',user);
  }
  //Here we have user listing
  listUser(){
    return this.http.get('http://localhost:2000/endpoint/ ');
  }

  //Here we have user deleting
  deleteUser(id:any){
    return this.http.delete('http://localhost:2000/endpoint/deleteUser/'+id);

  }


  //Here we have user updating
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put('http://localhost:2000/endpoint/updateUser/'+id, data)
      // .pipe(catchError(this.handleError));
  }
}
