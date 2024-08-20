import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './Service/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadComponent } from './read/read.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StaticComponent } from './static/static.component';
import { RegistrationComponent } from './registration/registration.component';

import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    ReadComponent,
    NavbarComponent,
    StaticComponent,
    RegistrationComponent,

    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideHttpClient(), AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
