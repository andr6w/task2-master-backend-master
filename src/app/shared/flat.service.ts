import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flat } from './flat.model';
import { House } from './house.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  //formData, i used template driven forms and send data directly to service.ts from flat component . 
  formData: Flat = {
    FlatId: null,
    FlatNumber: null,
    FlatFloor: null,
    FlatRoomsAmmount: null,
    FlatResidentAmmount: null,
    FlatFullArea: null,
    FlatLivingSpaceArea: null,
    HouseId: null,
  }

  readonly rootURL = 'http://localhost:50271/api'
  // List of ALL flats which is stored in DB
  listForAllFlats: Flat[];
  // 
  houseIdList: House[] = [];
  listForHouseFlats: Flat[];
  hSelected: number;


  constructor(private http: HttpClient) { }

  postFlat() {
    return this.http.post(this.rootURL + '/Flat', this.formData);
  }

  putFlat() {
    return this.http.put(this.rootURL + '/Flat/' + this.formData.FlatId, this.formData);
  }

  deleteFlat(id) {
    return this.http.delete(this.rootURL + '/Flat/' + id);
  }



  refreshList() {
    this.http.get(this.rootURL + '/Flat')
      .toPromise()
      .then(res => this.listForAllFlats = res as Flat[]
      );
  }
  refreshFlatList(id) {
    this.http.get(this.rootURL + '/Houses/' + id + '/flats')
      .toPromise()
      .then(res => this.listForHouseFlats = res as Flat[]);
  }

  refreshHouseList() {
    return this.http.get<House[]>(this.rootURL + '/House');
    // .pipe(
    //   map(data => {
    //     data.forEach(house => house.myDate = new Date(house.myDate))
    //     return data;
    //   })
    // );
  }

  getHouseFlats(id) {
    this.hSelected = id;
    return this.http.get<Flat[]>(this.rootURL + '/Houses/' + id + '/flats')
  }
}
