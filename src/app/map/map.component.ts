import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';

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
  test: string = 'Test';
  ngOnInit() {
    // var myLatLng = { lat: 7.895167, lng: 98.352083 };
    var infoWindow;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: {lat: -34.397, lng: 150.644},
    });

    // var contentString = '<div id="content">'+
    // '<div id="siteNotice">'+
    // '</div>'+
    // '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    // '<div id="bodyContent">'+
    // '<p><b>'+this.test+'</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    // 'sandstone rock formation in the southern part of the '+
    // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
    // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    // 'Aboriginal people of the area. It has many springs, waterholes, '+
    // 'rock caves and ancient paintings. Uluru is listed as a World '+
    // 'Heritage Site.</p>'+
    // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    // '(last visited June 22, 2009).</p>'+
    // '</div>'+
    // '</div>';

    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: 'Hello World!'
    // });

    // var infowindow = new google.maps.InfoWindow({
    //   content: contentString,
    //   maxWidth: 200
    // });

    // marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  
  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter(e: any) {
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }
}
