import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  RequestOptions, Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  distance: number;

  constructor(public navCtrl: NavController, public http: HttpClient ,public db : AngularFirestore) {

  }

  ionViewDidLoad(){
   this.getData();
  }

  on() {
    let data = {
      "key" : 'ttn-account-v2.AEs3vkJ-RLJd0DLsrLJeNfTklrTZ1KFr-Ulv1jf410U',
      "dev_id": "cfcmorack",
      "port": 1,
      "confirmed": false,
      "payload_fields": {
        "value": 1
      }
    }
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let options = new RequestOptions();
    this.http.post('http://localhost:8100/api', data, {headers : headers}).subscribe();
  }

  off() {
    let data = {
      "dev_id": "cfcmorack",
      "port": 1,
      "confirmed": false,
      "payload_fields": {
        "value": 0
      }
    }
    this.http.post('https://integrations.thethingsnetwork.org/ttn-eu/api/v2/down/morackcfc/test?key=ttn-account-v2.AEs3vkJ-RLJd0DLsrLJeNfTklrTZ1KFr-Ulv1jf410U', data);
  }

  getData(){
    console.log("Came Here")
    let doc = this.db.collection('morackcfc').doc('cfcmorack');

    let observer = doc.valueChanges().subscribe((data) => {
      console.log(data);
    })
  }

}
