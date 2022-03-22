import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  titre: String = "titre" ;
  code: String = "code" ;
  nomDuFichier: String = this.titre+"."+this.code+".NomDeVersion.json";

  form: FormGroup = new FormGroup({
    nomControl : new FormControl(''),
    codeControl  : new FormControl(''),
    tailleControl  : new FormControl(''),
  })

  constructor(private Formbuilder: FormBuilder,private router: Router) { }



  ngOnInit(): void {
    this.form = this.Formbuilder.group(
      {
        nomControl: ['', Validators.required],
        codeControl:['', Validators.required],
        tailleControl:[1, Validators.required],
      })
  }

  onSubmit() {
    sessionStorage.setItem("name",this.form.value.nomControl)
    sessionStorage.setItem("code",this.form.value.codeControl)

    if (this.form.value.tailleControl == 1) this.router.navigate(['/s4'])
    else this.router.navigate(['/s6'])
  }

  changementTitre(){
    this.titre=this.form.value.nomControl;
    this.changement();
  }

  changementCode(){
    this.code=this.form.value.codeControl;
    this.changement();
  }

  changement(){
    this.nomDuFichier=this.titre+"."+this.code+".NomDeVersion.json";
  }
}
