import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadComponent } from './read/read.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StaticComponent } from './static/static.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    ReadComponent,
    NavbarComponent,
    StaticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
