import {AfterContentInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RestaurantsService} from "../../services/restaurants.service";
import {Restaurant} from "../../models/restaurant";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare let google: any;
const STYLE_ARRAY: any[] = [{
  'featureType': 'water',
  'elementType': 'geometry.fill',
  'stylers': [{'color': '#d3d3d3'}]
}, {'featureType': 'transit', 'stylers': [{'color': '#808080'}, {'visibility': 'off'}]}, {
  'featureType': 'road.highway',
  'elementType': 'geometry.stroke',
  'stylers': [{'visibility': 'on'}, {'color': '#b3b3b3'}]
}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {
  'featureType': 'road.local',
  'elementType': 'geometry.fill',
  'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'weight': 1.8}]
}, {'featureType': 'road.local', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#d7d7d7'}]}, {
  'featureType': 'poi',
  'elementType': 'geometry.fill',
  'stylers': [{'visibility': 'on'}, {'color': '#ebebeb'}]
}, {'featureType': 'administrative', 'elementType': 'geometry', 'stylers': [{'color': '#a7a7a7'}]}, {
  'featureType': 'road.arterial',
  'elementType': 'geometry.fill',
  'stylers': [{'color': '#ffffff'}]
}, {'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}]}, {
  'featureType': 'landscape',
  'elementType': 'geometry.fill',
  'stylers': [{'visibility': 'on'}, {'color': '#efefef'}]
}, {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#696969'}]}, {
  'featureType': 'administrative',
  'elementType': 'labels.text.fill',
  'stylers': [{'visibility': 'on'}, {'color': '#737373'}]
}, {'featureType': 'poi', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {
  'featureType': 'poi',
  'elementType': 'labels',
  'stylers': [{'visibility': 'off'}]
}, {'featureType': 'road.arterial', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#d6d6d6'}]}, {
  'featureType': 'road',
  'elementType': 'labels.icon',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'landscape.natural',
  'elementType': 'labels.icon',
  'stylers': [{'visibility': 'off'}],
},
  {'featureType': 'poi', 'elementType': 'geometry.fill', 'stylers': [{'color': '#dadada'}]}];

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, AfterContentInit {

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef = new ElementRef(null);
  map: any;
  mapTrys: number = 0;
  restaurantsMarkers: any[] = [];
  restaurants: any[] = [];
  infoWindows: any[] = [];
  restaurantForm: FormGroup = new FormGroup({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    address: new FormControl({value: '', disabled: false}, Validators.required),
    type: new FormControl({value: '', disabled: false}, Validators.required),
    hours: new FormControl({value: '', disabled: false}),
    phoneNumber: new FormControl({value: '', disabled: false}),
  })

  constructor(private restaurantsService: RestaurantsService) {
  }

  ngOnInit(): void {
    this.restaurantsMarkers = [];
    this.restaurants = [];
    this.infoWindows = [];
    this.getRestaurants();
  }

  ngAfterContentInit(): void {
    this.onResize();
    this.showMap();
  }

  onResize() {
    this.resizeHandler();
  }


  showMap(): void {
    setTimeout(() => {
      if (this.mapTrys < 10) {
        try {
          // we could use users location
          const location = new google.maps.LatLng(-37.325473, -59.138157);
          const options = {
            center: location,
            zoom: 15,
            minZoom: 3,
            styles: STYLE_ARRAY
          };
          this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        } catch (e) {
          console.log(e);
          this.mapTrys += 1;
          this.showMap();
        }
      }
    }, 50);
  }

  resizeHandler(): void {
    const map: any = document.getElementById('map');
    if (map.offsetParent !== null) {
      map.style.height = '75vh';
      map.style.width = '100%';
      this.showMap();
    }
  }

  getRestaurants(): void {
    this.restaurantsService.getRestaurants()
      .subscribe(data => {
        this.restaurants = data;
        this.addMarkersToMap();
      })
  }

  addMarkersToMap(): void {
    this.restaurants.forEach(restaurant => {
      this.createMarker(restaurant);
    })
  }

  createMarker(restaurant: Restaurant) {
    const size = 34;
    const image = {
      url: './assets/images/markers/pin.png',
      size: new google.maps.Size(size, size),
      scaledSize: new google.maps.Size(size, size)
    };
    console.log(restaurant.address)
    new google.maps.Geocoder().geocode({'address': restaurant.address}, (results: any, status: any) => {
      if (status === 'OK') {
        const mapMarker = new google.maps.Marker({
          position: results[0].geometry.location,
          icon: image,
          name: restaurant.name,
        });
        this.restaurantsMarkers.push(mapMarker);
        mapMarker.setMap(this.map);
        this.addInfoWindow(mapMarker, restaurant);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  addInfoWindow(marker: any, restaurant: Restaurant) {
    const infoWindowContent = '<div>' +
      '<h1>' + restaurant.name + '</h1>' +
      '<p>' + restaurant.type + '</p>' +
      '<p>' + restaurant.address + '</p>' +
      '<p>' + restaurant.phoneNumber + '</p>' +
      '<p>' + restaurant.hours + '</p>' +
      '</div>'

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (const window of this.infoWindows) {
      window.close();
    }
  }

  addNewRestaurant() {
    let newRestaurant = new Restaurant(
      this.restaurants.length,
      this.restaurantForm.value.name,
      this.restaurantForm.value.address,
      this.restaurantForm.value.type,
      this.restaurantForm.value.hours,
      this.restaurantForm.value.phoneNumber,
    );
    console.log(newRestaurant)
    this.restaurants.push(newRestaurant);
    this.createMarker(newRestaurant);
  }
}
