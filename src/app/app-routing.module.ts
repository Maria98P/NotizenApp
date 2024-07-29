import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { StaticComponent } from './static/static.component';

const routes: Routes = [{
  path:'', component: StaticComponent
},
{path:'list', component: ListComponent},
{
  path:'create', component: CreateComponent
},

{path: 'read/:notizId', component:ReadComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
