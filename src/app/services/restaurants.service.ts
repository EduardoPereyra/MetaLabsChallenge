import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Restaurant} from "../models/restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor() {
  }

  getRestaurants(): Observable<any> {
    let restaurants: Restaurant[] = [
      {
        "id": 1,
        "name": "State Property",
        "type": "Grill",
        "address": "San Martín 719, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "384-511-6800"
      }, {
        "id": 2,
        "name": "Gang Tapes",
        "type": "Coffee shop",
        "address": "Gral. Rodríguez 650, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "302-726-2361"
      }, {
        "id": 3,
        "name": "Elokuu",
        "type": "Buffet",
        "address": "Belgrano 591, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "224-311-3620"
      }, {
        "id": 4,
        "name": "Far from Heaven",
        "type": "Bar",
        "address": "Gral. Rodríguez 793, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "337-653-0250"
      }, {
        "id": 5,
        "name": "Blue Bird, The",
        "type": "Grill",
        "address": "Mitre 587, Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "214-174-3499"
      }, {
        "id": 6,
        "name": "Strangers When We Meet",
        "type": "Fast food",
        "address": "Mitre 545, B7000GOK Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "255-485-9921"
      }, {
        "id": 7,
        "name": "Cave of Forgotten Dreams",
        "type": "Coffee shop",
        "address": "Leandro Alem 1112, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "903-396-6469"
      }, {
        "id": 8,
        "name": "Objective, Burma!",
        "type": "Dining",
        "address": "Chacabuco 633, Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "339-712-6978"
      }, {
        "id": 9,
        "name": "Xinghua san yue tian",
        "type": "Fast food",
        "address": "14 de Julio 706, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "492-134-4992"
      }, {
        "id": 10,
        "name": "Story of My Life",
        "type": "Buffet",
        "address": "Mitre 920, B7000 Tandil, Provincia de Buenos Aires",
        "hours": "8:00 - 22-00",
        "phoneNumber": "406-737-2724"
      }
    ]
    return of(restaurants);
  }
}
