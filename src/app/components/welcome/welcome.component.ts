import {Component, Inject, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import UserCredential = firebase.auth.UserCredential;
import {User} from 'firebase';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  token: any;
  principal: any;
  valid: any;

  constructor(private firebaseService: FirebaseService,
              @Inject(SESSION_STORAGE) private storage: StorageService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.token = this.storage.get('token');

    this.apiService.getPrincipal(this.token).subscribe(value => {
      console.log(value);
      this.principal = value;
    });
  }

  validate() {

    this.token = this.storage.get('token');

    this.apiService.validate(this.token).subscribe(value => {
      console.log(value);
      this.valid = value;
    });

  }

  revoke() {
    this.token = this.storage.get('token');

    this.apiService.revoke(this.token).subscribe(value => {
      console.log(value);
      this.valid = value;
    });
  }
}
