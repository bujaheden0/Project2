import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LOCATIONS } from './mock-locationlist'
import { Location } from './map'
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule, FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: google.maps.Marker;
  latitude: number;
  longitude: number;
  locations = LOCATIONS;
  form: FormGroup;
  Province;
  Dorm: any = {}
  x: number;
  y: number;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

    this.auth.getDorm().subscribe(res => {
      this.Dorm = res;
      var obj = Object.keys(this.Dorm).length;
      // console.log(obj); 
      // console.log(this.Dorm[0].lat);
      var infoWindow;
      var markers = [];
      var contentString = [];
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 7.894866, lng: 98.352092 },
      });
      for (let i = 0; i < obj; i++) {
        var myLatLng = { lat: this.Dorm[i].lat, lng: this.Dorm[i].long };
        // console.log(myLatLng);
        markers[i] = new google.maps.Marker({
          position: myLatLng,
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: 'Hello World!'
        });
        // markers.push(marker);

        var contentString1 = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h3 id="firstHeading" class="firstHeading">' + this.Dorm[i].name + '</h3>' +
          '<div id="bodyContent">' +
          '<p><b>554</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the ' +
          'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
          'south west of the nearest large town, Alice Springs; 450&#160;km ' +
          '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
          'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
          'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
          'Aboriginal people of the area. It has many springs, waterholes, ' +
          'rock caves and ancient paintings. Uluru is listed as a World ' +
          'Heritage Site.</p>' +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>';
        contentString.push(contentString1);
      }
      var infowindow;
      for (var i = 0; i < contentString.length; i++) {
         infowindow = new google.maps.InfoWindow({
          content: contentString[i],
          maxWidth: 200
        });
      }
      for (var i = 0; i < markers.length; i++) {
      markers[i].addListener('click', function () {
        // if (markers[i] = contentString[i]) {
        infowindow.open(map, markers[i]);
        // }
      });
      }


      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('คุณอยู่ที่นี่');
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(15);
        }, function () {
          this.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter());
      }
    })
  }


  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  // setMapType(mapTypeId: string) {
  //   this.map.setMapTypeId(mapTypeId)
  // }
  setCenter(e: any) {
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }
  Changelocation() {
    this.auth.getDorm().subscribe(res => {
      this.Dorm = res;
      var obj = Object.keys(this.Dorm).length;
      var markers = [];

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: this.Province.zoom,
        center: { lat: this.Province.Lat, lng: this.Province.Lng },
      });

      if (this.Province.name == "อำเภอกะทู้") {

        for (let i = 0; i < obj; i++) {
          if (this.Dorm[i].type == "กะทู้") {
            var myLatLng = { lat: this.Dorm[i].lat, lng: this.Dorm[i].long };
            // console.log(myLatLng);
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              title: 'Hello World!'
            });
            markers.push(marker);
          }
        }



      } else if (this.Province.name == "อำเภอเมืองภูเก็ต") {
        // for (var i = 0; i < markers.length; i++) {
        //   markers[i].setMap(null);
        // }
        // markers = [];
        for (let i = 0; i < obj; i++) {
          if (this.Dorm[i].type == "เมืองภูเก็ต") {
            var myLatLng = { lat: this.Dorm[i].lat, lng: this.Dorm[i].long };
            // console.log(myLatLng);
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              title: 'Hello World!'
            });
          }
        }
      } else if (this.Province.name == "อำเภอถลาง") {

        for (let i = 0; i < obj; i++) {
          if (this.Dorm[i].type == "ถลาง") {
            var myLatLng = { lat: this.Dorm[i].lat, lng: this.Dorm[i].long };
            // console.log(myLatLng);
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              title: 'Hello World!'
            });
          }
        }
      }
    })
  }

}
