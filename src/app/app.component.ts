import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'poc-firebase-angular';
  username: string;

  constructor(private firebaseService: FirebaseService,
              @Inject(SESSION_STORAGE) private storage: StorageService,
              private apiService: ApiService) {

  }

  logOut() {
    this.firebaseService.logOut();
  }

  ngDoCheck(): void {
    const token = this.storage.get('token');
    if (token) {
      // const principal = this.apiService.getPrincipal(token).subscribe(value => {
      //   console.log(value);
      // });
      // this.username = this.storage.get('current-user').displayName;
    } else {
      this.username = 'Anonymous';
    }
  }
}
