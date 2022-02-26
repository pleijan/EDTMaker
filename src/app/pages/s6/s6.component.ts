import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-s6',
  templateUrl: './s6.component.html',
  styleUrls: ['./s6.component.css']
})
export class S6Component implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }


  accueil() {
    sessionStorage.clear()
    this.router.navigate(['/home'])
  }
}
