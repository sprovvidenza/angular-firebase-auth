import {Component, Inject, OnInit} from '@angular/core';
import {User} from './model/User';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  providers = new Map();

  user = new User();

  constructor(private firebaseService: FirebaseService, private router: Router, @Inject(SESSION_STORAGE) private storage: StorageService) {
  }

  ngOnInit() {
    this.providers.set('google', new firebase.auth.GoogleAuthProvider());
    this.providers.set('facebook', new firebase.auth.FacebookAuthProvider());
    const token = this.storage.get('token');
    if (token) {
      this.router.navigate(['welcome']);
    }
  }

  logIn() {

  }

  submit() {
    this.firebaseService.login(this.user);
    this.router.navigate(['welcome']);
  }

  selectProvider(value) {
    this.firebaseService.loginWithSocial(this.providers.get(value));
  }
}
