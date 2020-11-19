import { Injectable } from '@angular/core';
import { House } from './house.model';
import { Flat } from './flat.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HouseService {


  //Working with reactive forms, so i added formGroup
  formGroup: House = new House();

  readonly rootURL = 'http://localhost:50271/api'
  //House List - stores all the house objects
  listForAllHouses: House[];
  constructor(public http: HttpClient) { }

  //Post new house into DB
  postHouse() {
    return this.http.post(this.rootURL + '/House', this.formGroup);
  }
  //Getting one specific house from DB
  getHouse(id) {
    return this.http.get(this.rootURL + '/House/' + id)
  }
  //Method for making changes in db
  putHouse() {
    return this.http.put(this.rootURL + '/House/' + this.formGroup.HId, this.formGroup);
  }
  //method for deleting from DB
  deleteHouse(id) {
    return this.http.delete(this.rootURL + '/House/' + id);
  }
  //method for getting all items in DB, also sending JWT token for checking if USER is logged in system, storing all objects in LIST
  refreshList() {
    const token = localStorage.getItem("jwt");
    this.http.get(this.rootURL + '/House', {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': "Bearer" + token
      })
    }).toPromise()
      .then(res => this.listForAllHouses = res as House[]);

  }



}
