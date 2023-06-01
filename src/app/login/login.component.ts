import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = ''
  password = ''
  invalidLogin = false
  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  @Input() error!: string | null;
  @Output() submitEM = new EventEmitter();

  constructor(private router: Router,
    private loginservice: AuthentificationService) { }

  ngOnInit(): void {

    // localStorage.removeItem('username');
    // localStorage.removeItem('password');
    // localStorage.removeItem('role')
    localStorage.removeItem('role')
    sessionStorage.removeItem('basicauth')
    
  }

  checkLogin() {
    (this.loginservice.authenticate(this.user, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      }
    )
    );
  }

  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
  }

}
