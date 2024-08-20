import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { StaticComponent } from './static/static.component';
import { RegistrationComponent } from './registration/registration.component';

import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [{
  path:'', component: StaticComponent
},
{path:'list', component: ListComponent},
{
  path:'create', component: CreateComponent
},

{path: 'read/:notizId', component:ReadComponent},

{path: 'register', component: RegistrationComponent},
{path: 'user/create', component: CreateUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
