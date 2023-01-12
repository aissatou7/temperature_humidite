import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private http:HttpClient,
    private route:Router
    ) {
    
   }

//CONNEXION
login(user:any){
  return this.http.post('http://localhost:2000/endpoint/test',user)
}

// DECONNEXION
logout() {
  //remove user from localStorage
  localStorage.clear(); //delete all user connected information, into token
  this.route.navigate(['/'])
  // this.currentUserSubject.next(null);
}
  //Here we have user adding
  addUser(user:any){
       return this.http.post('http://localhost:2000/endpoint/addUser', user);
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
