import {Component, OnInit} from '@angular/core';
import {Registration} from './model/Registration';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [FirebaseService]
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  registration = new Registration();

  constructor(private firebaseService: FirebaseService, private router: Router) {

  }

  ngOnInit() {
  }

  register() {
    console.log(JSON.stringify(this.registration));
  }

  submit() {
    console.log(JSON.stringify(this.registration));
    this.firebaseService.register(this.registration);
    this.router.navigate(['login']);
  }
}
