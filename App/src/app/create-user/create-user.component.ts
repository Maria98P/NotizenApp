import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    console.error('Registration failed');
    this.authService.register(this.email, this.password).subscribe(
      response => {
        console.log('Registration successful', response);
        // Handle success (e.g., show a success message or redirect)
      },
      error => {
        console.error('Registration failed', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}
