import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S4Component } from './pages/s4/s4.component';
import { RouterModule, Routes } from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {S6Component} from "./pages/s6/s6.component";

const routes: Routes = [
  { path: 's4', component: S4Component },
  { path: 's6', component: S6Component },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
