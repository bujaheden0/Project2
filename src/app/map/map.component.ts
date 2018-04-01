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
      var marker;
      var contentString;
      var contentStrings = [];
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 7.894866, lng: 98.352092 },
      });
      for (let i = 0; i < obj; i++) {
        var myLatLng = { lat: this.Dorm[i].lat, lng: this.Dorm[i].long };
        // console.log(myLatLng);
        marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: 'Hello World!'
        });
        // markers.push(marker);

        contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h2 id="firstHeading" class="firstHeading">' + this.Dorm[i].name + '</h2>' +
          '<div id="bodyContent">' +
          '<p><h5>ที่อยู่: </h5>' + this.Dorm[i].address +
          '<h5>เบอร์โทรศัพท์: </h5>' + this.Dorm[i].tel +
          '<h5>ยูนิตไฟฟ้า: </h5>' + this.Dorm[i].electric_unit +
          '<h5>ค่าน้ำ: </h5>' + this.Dorm[i].water_bill +
          '<h5>ราคาห้องพัดลม: </h5>' + this.Dorm[i].price.fan_price +
          '<h5>ราคาห้องแอร์: </h5>' + this.Dorm[i].price.air_price +
          '<h5>คำอธิบาย: </h5>' + this.Dorm[i].description +
          '<h5>ประเภท: </h5>' + this.Dorm[i].type + '</p>' +
          '</div>' +
          '</div>';

        contentStrings.push(contentString);
        var infowindow = new google.maps.InfoWindow({
          maxWidth: 200
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(contentStrings[i]);
            infowindow.open(map, marker);
          }
        })(marker, i));
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
      var infoWindow;
      var contentString;
      var contentStrings = [];
      var obj = Object.keys(this.Dorm).length;

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: this.Province.zoom,
        center: { lat: this.Province.Lat, lng: this.Province.Lng },
      });

      if (this.Province.name == "อำเภอกะทู้") {
         contentStrings = [];
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

            contentString = '<div id="content">' +
              '<div id="siteNotice">' +
              '</div>' +
              '<h2 id="firstHeading" class="firstHeading">' + this.Dorm[i].name + '</h2>' +
              '<div id="bodyContent">' +
              '<p><h5>ที่อยู่: </h5>' + this.Dorm[i].address +
              '<h5>เบอร์โทรศัพท์: </h5>' + this.Dorm[i].tel +
              '<h5>ยูนิตไฟฟ้า: </h5>' + this.Dorm[i].electric_unit +
              '<h5>ค่าน้ำ: </h5>' + this.Dorm[i].water_bill +
              '<h5>ราคาห้องพัดลม: </h5>' + this.Dorm[i].price.fan_price +
              '<h5>ราคาห้องแอร์: </h5>' + this.Dorm[i].price.air_price +
              '<h5>คำอธิบาย: </h5>' + this.Dorm[i].description +
              '<h5>ประเภท: </h5>' + this.Dorm[i].type + '</p>' +
              '</div>' +
              '</div>';

            contentStrings.push(contentString);
            var infowindow = new google.maps.InfoWindow({
              maxWidth: 200
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                infowindow.setContent(contentStrings[0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
        }



      } else if (this.Province.name == "อำเภอเมืองภูเก็ต") {
         contentStrings = [];
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

            contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h2 id="firstHeading" class="firstHeading">' + this.Dorm[i].name + '</h2>' +
            '<div id="bodyContent">' +
            '<p><h5>ที่อยู่: </h5>' + this.Dorm[i].address +
            '<h5>เบอร์โทรศัพท์: </h5>' + this.Dorm[i].tel +
            '<h5>ยูนิตไฟฟ้า: </h5>' + this.Dorm[i].electric_unit +
            '<h5>ค่าน้ำ: </h5>' + this.Dorm[i].water_bill +
            '<h5>ราคาห้องพัดลม: </h5>' + this.Dorm[i].price.fan_price +
            '<h5>ราคาห้องแอร์: </h5>' + this.Dorm[i].price.air_price +
            '<h5>คำอธิบาย: </h5>' + this.Dorm[i].description +
            '<h5>ประเภท: </h5>' + this.Dorm[i].type + '</p>' +
            '</div>' +
            '</div>';
  
          contentStrings.push(contentString);
          var infowindow = new google.maps.InfoWindow({
            maxWidth: 200
          });
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(contentStrings[0]);
              infowindow.open(map, marker);
            }
          })(marker, i)); 
          }
        }

      } else if (this.Province.name == "อำเภอถลาง") {
        contentStrings = [];
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

            contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h2 id="firstHeading" class="firstHeading">' + this.Dorm[i].name + '</h2>' +
            '<div id="bodyContent">' +
            '<p><h5>ที่อยู่: </h5>' + this.Dorm[i].address +
            '<h5>เบอร์โทรศัพท์: </h5>' + this.Dorm[i].tel +
            '<h5>ยูนิตไฟฟ้า: </h5>' + this.Dorm[i].electric_unit +
            '<h5>ค่าน้ำ: </h5>' + this.Dorm[i].water_bill +
            '<h5>ราคาห้องพัดลม: </h5>' + this.Dorm[i].price.fan_price +
            '<h5>ราคาห้องแอร์: </h5>' + this.Dorm[i].price.air_price +
            '<h5>คำอธิบาย: </h5>' + this.Dorm[i].description +
            '<h5>ประเภท: </h5>' + this.Dorm[i].type + '</p>' +
            '</div>' +
            '</div>';
  
          contentStrings.push(contentString);
          var infowindow = new google.maps.InfoWindow({
            maxWidth: 200
          });
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(contentStrings[0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
          }
        }
      }
    })
  }

}
