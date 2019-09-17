import {Component} from '@angular/core';
import {FirebaseService} from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poc-firebase-angular';


  constructor(private firebaseService: FirebaseService) {
  }

  logOut() {
    this.firebaseService.logOut();
  }
}
