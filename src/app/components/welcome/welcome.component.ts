import {Component, Inject, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import UserCredential = firebase.auth.UserCredential;
import {User} from 'firebase';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user: UserCredential;

  constructor(private firebaseService: FirebaseService, @Inject(SESSION_STORAGE) private storage: StorageService) {
  }

  ngOnInit() {
    this.user = this.storage.get('current-user');
    console.log(`WelcomeComponent -  ${JSON.stringify(this.user)}`);
  }

}
