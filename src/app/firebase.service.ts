import {Inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import * as firebase from 'firebase';
import {Registration} from './components/register/model/Registration';
import {User} from './components/log-in/model/User';
import {auth} from 'firebase';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';
import AuthProvider = firebase.auth.AuthProvider;
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private router: Router) {
    if (!firebase.apps.length) {
      console.log('initialize new firebase App');
      firebase.initializeApp(environment.firebase);
    }
  }

  register(registration: Registration) {
    auth().createUserWithEmailAndPassword(registration.mail, registration.password).catch(reason => {
      console.log(`${reason.code}, ${reason.message}`);
    });
  }

  login(user: User) {
    auth().signInWithEmailAndPassword(user.mail, user.password)
      .catch(reason => {
        console.log(`${reason.code}, ${reason.message}`);
      });

    auth().onAuthStateChanged(a => {
      if (a) {
        console.log(`token ${JSON.stringify(a)}`);
        a.getIdToken(true).then(value => {
          this.storage.set('token', value);
          this.router.navigate(['welcome']);
        });


      }
    });
    // this.storage.s/et('token', auth().currentUser.getIdToken(true));
  }

  loggedUser() {
    return auth().currentUser;
  }

  loginWithSocial(provider: AuthProvider) {
    auth().signInWithPopup(provider)
      .catch(reason => {
        console.log(`${reason.code}, ${reason.message}`);
      });

    auth().onAuthStateChanged(a => {
      if (a) {
        console.log(`token ${auth().currentUser.getIdToken(true)}`);
        a.getIdToken(true).then(value => {
          this.storage.set('token', value);
          this.router.navigate(['welcome']);
        });
      }

    });
  }

  getRedirect() {
    auth().getRedirectResult().then(value => {
      this.router.navigate(['welcome']);
    });
  }

  logOut() {
    auth().signOut()
      .then(value => {
        console.log('logout');
        this.storage.remove('token');
        this.router.navigate(['login']);
      });
  }

}
