import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import exportFromJSON from 'export-from-json'

interface cours {
  nom: string;
  heureDeCours: number;
  heureLabo: number;
  heureDevoirs: number;
  optionnel:boolean;
}

interface categories{
  nom: string;
  couleur:string;
  listeCours: cours[];
}

interface MetaData{
  nom: string;
  code :string;
  nbSemestre: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  semestre1HDC:number = 0;
  semestre2HDC:number = 0;
  semestre3HDC:number = 0;
  semestre4HDC:number = 0;
  semestre1HAD:number = 0;
  semestre2HAD:number = 0;
  semestre3HAD:number = 0;
  semestre4HAD:number = 0;

  nombreDeCours:number=1;

  metadata: MetaData = {nom: "EmploiDuTemps", code:"INFO", nbSemestre:4}

  specifique: categories[] = []

  general:categories[]=[];

  color: any;
  constructor() { }

  ngOnInit(): void {
    this.calculSemestre()
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

    this.semestre1HAD = 0;
    this.semestre2HAD = 0;
    this.semestre3HAD = 0;
    this.semestre4HAD = 0;

    for (let i = 0; i < this.general.length; i++) {
      for (let y = 0; y < this.general[i].listeCours.length; y++) {

        if(y==0){
          this.semestre1HDC = this.semestre1HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre1HAD = this.semestre1HAD  + this.general[i].listeCours[y].heureLabo;
        }
        if(y==1){
          this.semestre2HDC = this.semestre2HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre2HAD = this.semestre2HAD  + this.general[i].listeCours[y].heureLabo;
        }
        if(y==2){
          this.semestre3HDC = this.semestre3HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre3HAD = this.semestre3HAD  + this.general[i].listeCours[y].heureLabo;
        }
        if(y==3){
          this.semestre4HDC = this.semestre4HDC  + this.general[i].listeCours[y].heureDeCours;
          this.semestre4HAD = this.semestre4HAD  + this.general[i].listeCours[y].heureLabo;
        }
      }
    }

    for (let i = 0; i < this.specifique.length; i++) {
      for (let y = 0; y < this.specifique[i].listeCours.length; y++) {

        if(y==0){
          this.semestre1HDC = this.semestre1HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre1HAD = this.semestre1HAD  + this.specifique[i].listeCours[y].heureLabo;
        }
        if(y==1){
          this.semestre2HDC = this.semestre2HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre2HAD = this.semestre2HAD  + this.specifique[i].listeCours[y].heureLabo;
        }
        if(y==2){
          this.semestre3HDC = this.semestre3HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre3HAD = this.semestre3HAD  + this.specifique[i].listeCours[y].heureLabo;
        }
        if(y==3){
          this.semestre4HDC = this.semestre4HDC  + this.specifique[i].listeCours[y].heureDeCours;
          this.semestre4HAD = this.semestre4HAD  + this.specifique[i].listeCours[y].heureLabo;
        }
      }
    }
  }

  setNbCours(n:number){
    this.nombreDeCours=n;
  }

  counter(i: number) {
    return new Array(i);
  }

  Save() {
    const data = [this.metadata, this.general, this.specifique]
    const fileName = this.metadata.nom+"_"+this.metadata.code
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
}
