import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validator, Validators, AbstractControl} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import exportFromJSON from 'export-from-json'
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

export interface cours {
  nom: string;
  heureDeCours: number;
  heureLabo: number;
  heureDevoirs: number;
  optionnel:boolean;
}
export interface categories{
  nom: string;
  couleur:string;
  listeCours: cours[];
}
export interface MetaData{
  nom: string;
  code :string;
}


@Component({
  selector: 'app-home',
  templateUrl: './s4.html',
  styleUrls: ['./s4.component.css']
})
export class S4Component implements OnInit {

  form: FormGroup = new FormGroup({
    nomControl : new FormControl(''),
    Mat1Control  : new FormControl(''),
    hdc1Control  : new FormControl(''),
    hdl1Control  : new FormControl(''),
    hdd1Control  : new FormControl(''),
    typeControl  : new FormControl(''),
    couleurControl  : new FormControl(''),
  })


  semestre1HDC:number = 0;
  semestre2HDC:number = 0;
  semestre3HDC:number = 0;
  semestre4HDC:number = 0;
  semestre1HDD:number = 0;
  semestre2HDD:number = 0;
  semestre3HDD:number = 0;
  semestre4HDD:number = 0;
  semestre1HDL:number = 0;
  semestre2HDL:number = 0;
  semestre3HDL:number = 0;
  semestre4HDL:number = 0;
  nombreDeCours:number = 1;
  totalS1:number = 0;
  totalS2:number = 0;
  totalS3:number = 0;
  totalS4:number = 0;



  specifique: categories[] = []

  general:categories[]=[];

  color: any;
  metadata: MetaData | undefined;
  constructor(private Formbuilder: FormBuilder,private _snackBar: MatSnackBar,private router: Router ) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('name') == null || sessionStorage.getItem('code') == null || sessionStorage.getItem('semestre') == null) {
      this.router.navigate(['home'])
    }
    // @ts-ignore
    this.metadata = {
      nom: sessionStorage.getItem('name')|| '{}',
      code: sessionStorage.getItem('code')|| '{}'
    }
    this.calculSemestre()

    this.form = this.Formbuilder.group(
      {
        nomControl: ['', Validators.required],
        mat1Control: ['', Validators.required],
        hdd1Control: ['', Validators.required],
        hdc1Control: ['', Validators.required],
        hdl1Control: ['', Validators.required],
        mat2Control: [''],
        hdd2Control: [''],
        hdc2Control: [''],
        hdl2Control: [''],
        mat3Control: [''],
        hdd3Control: [''],
        hdc3Control: [''],
        hdl3Control: [''],
        mat4Control: [''],
        hdd4Control: [''],
        hdc4Control: [''],
        hdl4Control: [''],
        typeControl: ['', Validators.required],
        couleurControl: ['', Validators.required]
      }
    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  drop(event: CdkDragDrop<string[]>,matiere: categories) {
    moveItemInArray(matiere.listeCours, event.previousIndex, event.currentIndex);
    this.calculSemestre()
  }

  calculSemestre(){

    this.semestre1HDC = 0;
    this.semestre2HDC = 0;
    this.semestre3HDC = 0;
    this.semestre4HDC = 0;

    this.semestre1HDD = 0;
    this.semestre2HDD = 0;
    this.semestre3HDD = 0;
    this.semestre4HDD = 0;

    this.semestre1HDL = 0;
    this.semestre2HDL = 0;
    this.semestre3HDL = 0;
    this.semestre4HDL = 0;

    this.totalS1 = 0;
    this.totalS2 = 0;
    this.totalS3 = 0;
    this.totalS4 = 0;

    for (let i = 0; i < this.general.length; i++) {
      for (let y = 0; y < this.general[i].listeCours.length; y++) {

        if(y==0){
          this.semestre1HDC = this.semestre1HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre1HDL = this.semestre1HDL  + this.general[i].listeCours[y].heureLabo;
          this.semestre1HDD = this.semestre1HDD  + this.general[i].listeCours[y].heureDevoirs;
        }
        if(y==1){
          this.semestre2HDC = this.semestre2HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre2HDL = this.semestre2HDL  + this.general[i].listeCours[y].heureLabo;
          this.semestre2HDD = this.semestre2HDD  + this.general[i].listeCours[y].heureDevoirs;
        }
        if(y==2){
          this.semestre3HDC = this.semestre3HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre3HDL = this.semestre3HDL  + this.general[i].listeCours[y].heureLabo;
          this.semestre3HDD = this.semestre3HDD  + this.general[i].listeCours[y].heureDevoirs;
        }
        if(y==3){
          this.semestre4HDC = this.semestre4HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre4HDL = this.semestre4HDL  + this.general[i].listeCours[y].heureLabo;
          this.semestre4HDD = this.semestre4HDD  + this.general[i].listeCours[y].heureDevoirs;
        }
      }

      for (let y = 0; y < this.specifique[i].listeCours.length; y++) {

        if(y==0){
          this.semestre1HDC = this.semestre1HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre1HDL = this.semestre1HDL  + this.specifique[i].listeCours[y].heureLabo;
          this.semestre1HDD = this.semestre1HDD  + this.specifique[i].listeCours[y].heureDevoirs;
        }
        if(y==1){
          this.semestre2HDC = this.semestre2HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre2HDL = this.semestre2HDL  + this.specifique[i].listeCours[y].heureLabo;
          this.semestre2HDD = this.semestre2HDD  + this.specifique[i].listeCours[y].heureDevoirs;
        }
        if(y==2){
          this.semestre3HDC = this.semestre3HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre3HDL = this.semestre3HDL  + this.specifique[i].listeCours[y].heureLabo;
          this.semestre3HDD = this.semestre3HDD  + this.specifique[i].listeCours[y].heureDevoirs;
        }
        if(y==3){
          this.semestre4HDC = this.semestre4HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre4HDL = this.semestre4HDL  + this.specifique[i].listeCours[y].heureLabo;
          this.semestre4HDD = this.semestre4HDD  + this.specifique[i].listeCours[y].heureDevoirs;
        }
      }
    }

    this.totalS1=this.semestre1HDD+this.semestre1HDC+this.semestre1HDL
    this.totalS2=this.semestre2HDD+this.semestre2HDC+this.semestre2HDL
    this.totalS3=this.semestre3HDD+this.semestre3HDC+this.semestre3HDL
    this.totalS4=this.semestre4HDD+this.semestre4HDC+this.semestre4HDL


  }

  setNbCours(n:number){
    this.nombreDeCours=n;
  }

  counter(i: number) {
    return new Array(i);
  }

  Save() {
    const data = [this.metadata, this.general, this.specifique]
    // @ts-ignore
    const fileName = this.metadata.nom+"_"+this.metadata.code+"_S4"
    const exportType = 'json'

    exportFromJSON({ data, fileName, exportType })
  }

  import($event: Event){

    const data = require("./EmploiDuTemps.INFO.json")

    this.metadata = data[0]
    this.general = data[1]
    this.specifique = data[2]

    // @ts-ignore
    console.log($event.target.files[0]);

    this.calculSemestre()
  }

  handleClick() {
    // @ts-ignore
    document.getElementById('upload-file').click();
  }

  deleteS(matiere:string) {
    this.specifique.forEach((elements,index)=>{
      if(elements.nom==matiere) this.specifique.splice(index,1)
    })
    this.calculSemestre()
  }

  deleteG(matiere: string) {
    this.general.forEach((elements,index)=>{
      if(elements.nom==matiere) this.general.splice(index,1)
    })
    this.calculSemestre()
  }

  onSubmit() {
    if (this.form.valid) {

      if (this.form.value.typeControl == 0) {
        this.specifique.push(<categories>{
          nom: this.form.value.nomControl,
          couleur: this.form.value.couleurControl,
          listeCours: [{
            nom: this.form.value.mat1Control,
            heureDeCours: this.form.value.hdc1Control,
            heureLabo: this.form.value.hdl1Control,
            heureDevoirs: this.form.value.hdd1Control,
            optionnel: false
          },
            {
              nom: this.form.value.mat2Control,
              heureDeCours: this.form.value.hdc2Control,
              heureLabo: this.form.value.hdl2Control,
              heureDevoirs: this.form.value.hdd2Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat3Control,
              heureDeCours: this.form.value.hdc3Control,
              heureLabo: this.form.value.hdl3Control,
              heureDevoirs: this.form.value.hdd3Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat4Control,
              heureDeCours: this.form.value.hdc4Control,
              heureLabo: this.form.value.hdl4Control,
              heureDevoirs: this.form.value.hdd4Control,
              optionnel: false
            },]
        })
      } else {
        this.general.push(<categories>{
          nom: this.form.value.nomControl,
          couleur: this.form.value.couleurControl,
          listeCours: [{
            nom: this.form.value.mat1Control,
            heureDeCours: this.form.value.hdc1Control,
            heureLabo: this.form.value.hdl1Control,
            heureDevoirs: this.form.value.hdd1Control,
            optionnel: false
          },
            {
              nom: this.form.value.mat2Control,
              heureDeCours: this.form.value.hdc2Control,
              heureLabo: this.form.value.hdl2Control,
              heureDevoirs: this.form.value.hdd2Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat3Control,
              heureDeCours: this.form.value.hdc3Control,
              heureLabo: this.form.value.hdl3Control,
              heureDevoirs: this.form.value.hdd3Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat4Control,
              heureDeCours: this.form.value.hdc4Control,
              heureLabo: this.form.value.hdl4Control,
              heureDevoirs: this.form.value.hdd4Control,
              optionnel: false
            },]
        })
      }


      this._snackBar.open("le cours de "+this.form.value.nomControl+" a bien été importé", 'ok', {
        duration: 3000
      });
      this.form.reset();
    }
    else this._snackBar.open("Il manque des informations pour créer le cours", 'ok', {
      duration: 3000
    });
    this.calculSemestre();
  }

  modifS(matiere: categories) {



  }

}
