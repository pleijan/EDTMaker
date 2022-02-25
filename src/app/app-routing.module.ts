import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S4Component } from './pages/s4/s4.component';
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  { path: 's4', component: S4Component },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', pathMatch: 'full',redirectTo: '/home' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
