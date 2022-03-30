import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import exportFromJSON from "export-from-json";

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
  selector: 'app-s6',
  templateUrl: './s6.component.html',
  styleUrls: ['./s6.component.css']
})
export class S6Component implements OnInit {

  color: string = "#FFFFFF"

  form: FormGroup = new FormGroup({
    nomControl : new FormControl(''),
    Mat1Control  : new FormControl(''),
    hdc1Control  : new FormControl(''),
    hdl1Control  : new FormControl(''),
    hdd1Control  : new FormControl(''),
    typeControl  : new FormControl(''),
  })

  semestre1HDC:number = 0;
  semestre2HDC:number = 0;
  semestre3HDC:number = 0;
  semestre4HDC:number = 0;
  semestre5HDC:number = 0;
  semestre6HDC:number = 0;
  semestre1HDD:number = 0;
  semestre2HDD:number = 0;
  semestre3HDD:number = 0;
  semestre4HDD:number = 0;
  semestre5HDD:number = 0;
  semestre6HDD:number = 0;
  semestre1HDL:number = 0;
  semestre2HDL:number = 0;
  semestre3HDL:number = 0;
  semestre4HDL:number = 0;
  semestre5HDL:number = 0;
  semestre6HDL:number = 0;
  totalEnsS1:number = 0;
  totalEnsS2:number = 0;
  totalEnsS3:number = 0;
  totalEnsS4:number = 0;
  totalEnsS5:number = 0;
  totalEnsS6:number = 0;
  totalS1:number = 0;
  totalS2:number = 0;
  totalS3:number = 0;
  totalS4:number = 0;
  totalS5:number = 0;
  totalS6:number = 0;

  specifique: categories[] = []

  general:categories[]=[];

  metadata: MetaData  = {
    nom: "",
    code: ""
  };

  constructor(private Formbuilder: FormBuilder,private _snackBar: MatSnackBar,private router: Router ) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('name') == null || sessionStorage.getItem('code') == null) {
      this.router.navigate(['home'])
      this.metadata = {
        nom: "",
        code: ""
      }
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
        mat5Control: [''],
        hdd5Control: [''],
        hdc5Control: [''],
        hdl5Control: [''],
        mat6Control: [''],
        hdd6Control: [''],
        hdc6Control: [''],
        hdl6Control: [''],
        typeControl: ['', Validators.required]
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
    this.semestre5HDC = 0;
    this.semestre6HDC = 0;

    this.semestre1HDD = 0;
    this.semestre2HDD = 0;
    this.semestre3HDD = 0;
    this.semestre4HDD = 0;
    this.semestre5HDD = 0;
    this.semestre6HDD = 0;

    this.semestre1HDL = 0;
    this.semestre2HDL = 0;
    this.semestre3HDL = 0;
    this.semestre4HDL = 0;
    this.semestre5HDL = 0;
    this.semestre6HDL = 0;

    this.totalEnsS1 = 0;
    this.totalEnsS2 = 0;
    this.totalEnsS3 = 0;
    this.totalEnsS4 = 0;
    this.totalEnsS5 = 0;
    this.totalEnsS6 = 0;

    this.totalS1 = 0;
    this.totalS2 = 0;
    this.totalS3 = 0;
    this.totalS4 = 0;
    this.totalS5 = 0;
    this.totalS6 = 0;

    for (let i = 0; i < this.general.length; i++) {
      for (let y = 0; y < this.general[i].listeCours.length; y++) {

        if (y == 0) {
          this.semestre1HDC = this.semestre1HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre1HDL = this.semestre1HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre1HDD = this.semestre1HDD + this.general[i].listeCours[y].heureDevoirs;
        }
        if (y == 1) {
          this.semestre2HDC = this.semestre2HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre2HDL = this.semestre2HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre2HDD = this.semestre2HDD + this.general[i].listeCours[y].heureDevoirs;
        }
        if (y == 2) {
          this.semestre3HDC = this.semestre3HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre3HDL = this.semestre3HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre3HDD = this.semestre3HDD + this.general[i].listeCours[y].heureDevoirs;
        }
        if (y == 3) {
          this.semestre4HDC = this.semestre4HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre4HDL = this.semestre4HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre4HDD = this.semestre4HDD + this.general[i].listeCours[y].heureDevoirs;
        }
        if (y == 4) {
          this.semestre5HDC = this.semestre5HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre5HDL = this.semestre5HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre5HDD = this.semestre5HDD + this.general[i].listeCours[y].heureDevoirs;
        }
        if (y == 5) {
          this.semestre6HDC = this.semestre6HDC + this.general[i].listeCours[y].heureDeCours;
          this.semestre6HDL = this.semestre6HDL + this.general[i].listeCours[y].heureLabo;
          this.semestre6HDD = this.semestre6HDD + this.general[i].listeCours[y].heureDevoirs;
        }

      }
    }
    for (let i = 0; i < this.specifique.length; i++) {
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
        if (y == 4) {
          this.semestre5HDC = this.semestre5HDC + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre5HDL = this.semestre5HDL + this.specifique[i].listeCours[y].heureLabo;
          this.semestre5HDD = this.semestre5HDD + this.specifique[i].listeCours[y].heureDevoirs;
        }
        if (y == 5) {
          this.semestre6HDC = this.semestre6HDC + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre6HDL = this.semestre6HDL + this.specifique[i].listeCours[y].heureLabo;
          this.semestre6HDD = this.semestre6HDD + this.specifique[i].listeCours[y].heureDevoirs;
        }
      }
    }

    this.totalS1=this.semestre1HDD+this.semestre1HDC+this.semestre1HDL
    this.totalS2=this.semestre2HDD+this.semestre2HDC+this.semestre2HDL
    this.totalS3=this.semestre3HDD+this.semestre3HDC+this.semestre3HDL
    this.totalS4=this.semestre4HDD+this.semestre4HDC+this.semestre4HDL
    this.totalS5=this.semestre5HDD+this.semestre5HDC+this.semestre5HDL
    this.totalS6=this.semestre6HDD+this.semestre6HDC+this.semestre6HDL

    this.totalEnsS1=this.semestre1HDC+this.semestre1HDL
    this.totalEnsS2=this.semestre2HDC+this.semestre2HDL
    this.totalEnsS3=this.semestre3HDC+this.semestre3HDL
    this.totalEnsS4=this.semestre4HDC+this.semestre4HDL
    this.totalEnsS5=this.semestre5HDC+this.semestre5HDL
    this.totalEnsS6=this.semestre6HDC+this.semestre6HDL

    console.log(this.totalS1,this.totalS2,this.totalS3,this.semestre4HDD+this.semestre4HDC+this.semestre4HDL)

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

  reset(){
    this.color="#FFFFFF"

    this.form = this.Formbuilder.group(
      {
        nomControl: ['', Validators.required],
        mat1Control: ['', Validators.required],
        hdd1Control: ['', Validators.required],
        hdc1Control: ['', Validators.required],
        hdl1Control: ['', Validators.required],
        mat2Control: [""],
        hdd2Control: [0],
        hdc2Control: [0],
        hdl2Control: [0],
        mat3Control: [""],
        hdd3Control: [0],
        hdc3Control: [0],
        hdl3Control: [0],
        mat4Control: [""],
        hdd4Control: [0],
        hdc4Control: [0],
        hdl4Control: [0],
        mat5Control: [""],
        hdd5Control: [0],
        hdc5Control: [0],
        hdl5Control: [0],
        mat6Control: [""],
        hdd6Control: [0],
        hdc6Control: [0],
        hdl6Control: [0],
        typeControl: ['', Validators.required],
      }
    )
  }

  onSubmit() {
    if (this.form.valid) {

      if (this.form.value.typeControl == 0) {
        this.specifique.push(<categories>{
          nom: this.form.value.nomControl,
          couleur: this.color,
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
            },
            {
              nom: this.form.value.mat5Control,
              heureDeCours: this.form.value.hdc5Control,
              heureLabo: this.form.value.hdl5Control,
              heureDevoirs: this.form.value.hdd5Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat6Control,
              heureDeCours: this.form.value.hdc6Control,
              heureLabo: this.form.value.hdl6Control,
              heureDevoirs: this.form.value.hdd6Control,
              optionnel: false
            },]
        })
      } else {
        this.general.push(<categories>{
          nom: this.form.value.nom,
          couleur: this.color,
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
            },
            {
              nom: this.form.value.mat5Control,
              heureDeCours: this.form.value.hdc5Control,
              heureLabo: this.form.value.hdl5Control,
              heureDevoirs: this.form.value.hdd5Control,
              optionnel: false
            },
            {
              nom: this.form.value.mat6Control,
              heureDeCours: this.form.value.hdc6Control,
              heureLabo: this.form.value.hdl6Control,
              heureDevoirs: this.form.value.hdd6Control,
              optionnel: false
            },]
        })
      }


      this._snackBar.open("le cours de "+this.form.value.nomControl+" a bien été importé", 'ok', {
        duration: 3000
      });
      this.reset();
    }
    else this._snackBar.open("Il manque des informations pour créer le cours", 'ok', {
      duration: 3000
    });
    this.calculSemestre();
  }

  modifS(matiere: categories) {

    this.color = matiere.couleur;

    this.form = this.Formbuilder.group(
      {
        nomControl: [matiere.nom, Validators.required],
        mat1Control: [matiere.listeCours[0].nom, Validators.required],
        hdd1Control: [matiere.listeCours[0].heureDevoirs, Validators.required],
        hdc1Control: [matiere.listeCours[0].heureDeCours, Validators.required],
        hdl1Control: [matiere.listeCours[0].heureLabo, Validators.required],
        mat2Control: [matiere.listeCours[1].nom],
        hdd2Control: [matiere.listeCours[1].heureDevoirs],
        hdc2Control: [matiere.listeCours[1].heureDeCours],
        hdl2Control: [matiere.listeCours[1].heureLabo],
        mat3Control: [matiere.listeCours[2].nom],
        hdd3Control: [matiere.listeCours[2].heureDevoirs],
        hdc3Control: [matiere.listeCours[2].heureDeCours],
        hdl3Control: [matiere.listeCours[2].heureLabo],
        mat4Control: [matiere.listeCours[3].nom],
        hdd4Control: [matiere.listeCours[3].heureDevoirs],
        hdc4Control: [matiere.listeCours[3].heureDeCours],
        hdl4Control: [matiere.listeCours[3].heureLabo],
        mat5Control: [matiere.listeCours[4].nom],
        hdd5Control: [matiere.listeCours[4].heureDevoirs],
        hdc5Control: [matiere.listeCours[4].heureDeCours],
        hdl5Control: [matiere.listeCours[4].heureDeCours],
        mat6Control: [matiere.listeCours[5].nom],
        hdd6Control: [matiere.listeCours[5].heureDevoirs],
        hdc6Control: [matiere.listeCours[5].heureDeCours],
        hdl6Control: [matiere.listeCours[5].heureDeCours],
        typeControl: [0, Validators.required],
        //couleurControl: ['', Validators.required]
      }
    )

    this.deleteS(matiere.nom)
  }

  modifG(matiere: categories) {

    this.color = matiere.couleur;

    this.form = this.Formbuilder.group(
      {
        nomControl: [matiere.nom, Validators.required],
        mat1Control: [matiere.listeCours[0].nom, Validators.required],
        hdd1Control: [matiere.listeCours[0].heureDevoirs, Validators.required],
        hdc1Control: [matiere.listeCours[0].heureDeCours, Validators.required],
        hdl1Control: [matiere.listeCours[0].heureLabo, Validators.required],
        mat2Control: [matiere.listeCours[1].nom],
        hdd2Control: [matiere.listeCours[1].heureDevoirs],
        hdc2Control: [matiere.listeCours[1].heureDeCours],
        hdl2Control: [matiere.listeCours[1].heureLabo],
        mat3Control: [matiere.listeCours[2].nom],
        hdd3Control: [matiere.listeCours[2].heureDevoirs],
        hdc3Control: [matiere.listeCours[2].heureDeCours],
        hdl3Control: [matiere.listeCours[2].heureLabo],
        mat4Control: [matiere.listeCours[3].nom],
        hdd4Control: [matiere.listeCours[3].heureDevoirs],
        hdc4Control: [matiere.listeCours[3].heureDeCours],
        hdl4Control: [matiere.listeCours[3].heureLabo],
        mat5Control: [matiere.listeCours[4].nom],
        hdd5Control: [matiere.listeCours[4].heureDevoirs],
        hdc5Control: [matiere.listeCours[4].heureDeCours],
        hdl5Control: [matiere.listeCours[4].heureDeCours],
        mat6Control: [matiere.listeCours[5].nom],
        hdd6Control: [matiere.listeCours[5].heureDevoirs],
        hdc6Control: [matiere.listeCours[5].heureDeCours],
        hdl6Control: [matiere.listeCours[5].heureDeCours],
        typeControl: [0, Validators.required],
        //couleurControl: ['', Validators.required]
      }
    )

    this.deleteG(matiere.nom)
  }

  accueil() {
    sessionStorage.clear()
    this.router.navigate(['/home'])
  }
}
