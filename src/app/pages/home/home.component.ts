import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

interface cours {
  nom: string;
  heureDeCours: number;
  heureAvecDevoir: number;
  optionnel:boolean;
}

interface matiere{
  nom: string;
  listeCours: cours[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matieres: matiere[] = [
    {nom: 'Mathematique', listeCours:[
      {nom:"MAT1",heureDeCours:3,heureAvecDevoir:5,optionnel:false},
      {nom:"MAT2",heureDeCours:5,heureAvecDevoir:8,optionnel:false},
      {nom:"MAT3",heureDeCours:4,heureAvecDevoir:6,optionnel:false},
      {nom:"MAT4",heureDeCours:4,heureAvecDevoir:6,optionnel:false}]},
    {nom: 'Mathematique2', listeCours:[
      {nom:"MATF",heureDeCours:4,heureAvecDevoir:6,optionnel:true},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false}]},
    {nom: 'Physique', listeCours:[
      {nom:"PHY1",heureDeCours:5,heureAvecDevoir:8,optionnel:false},
      {nom:"PHY2",heureDeCours:4,heureAvecDevoir:6,optionnel:false},
      {nom:"PHY3",heureDeCours:5,heureAvecDevoir:8,optionnel:false},
      {nom:"PHYF",heureDeCours:4,heureAvecDevoir:6,optionnel:true}]},
    {nom: 'Physique2', listeCours:[
        {nom:"PHYF",heureDeCours:4,heureAvecDevoir:6,optionnel:true},
        {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
        {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
        {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false}]},
    {nom: 'Chimie', listeCours:[
      {nom:"CHI1",heureDeCours:5,heureAvecDevoir:8,optionnel:false},
      {nom:"CHI2",heureDeCours:4,heureAvecDevoir:6,optionnel:false},
      {nom:"CHIF",heureDeCours:5,heureAvecDevoir:8,optionnel:true},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Biologie', listeCours:[
      {nom:"BIO1",heureDeCours:4,heureAvecDevoir:6,optionnel:false},
      {nom:"BIO2",heureDeCours:3,heureAvecDevoir:5,optionnel:false},
      {nom:"BIOF",heureDeCours:4,heureAvecDevoir:6,optionnel:true},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Informatique', listeCours:[
      {nom:"INF1",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:"INTC",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Francais', listeCours:[
      {nom:"FRA1",heureDeCours:4,heureAvecDevoir:7,optionnel:false},
      {nom:"FRA2",heureDeCours:4,heureAvecDevoir:7,optionnel:false},
      {nom:"FRA3",heureDeCours:4,heureAvecDevoir:8,optionnel:false},
      {nom:"FRA4",heureDeCours:4,heureAvecDevoir:6,optionnel:false}]},
    {nom: 'Anglais', listeCours:[
      {nom:"ANG1",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:"ANG2",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Philosophie', listeCours:[
      {nom:"PHI1",heureDeCours:4,heureAvecDevoir:7,optionnel:false},
      {nom:"PHI2",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:"PHI3",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Complementaire', listeCours:[
      {nom:"FC",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:"FC",heureDeCours:3,heureAvecDevoir:6,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
    {nom: 'Education physique', listeCours:[
      {nom:"EDU1",heureDeCours:2,heureAvecDevoir:3,optionnel:false},
      {nom:"EDU2",heureDeCours:2,heureAvecDevoir:3,optionnel:false},
      {nom:"EDU3",heureDeCours:2,heureAvecDevoir:3,optionnel:false},
      {nom:" ",heureDeCours:0,heureAvecDevoir:0,optionnel:false},]},
  ];
  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>,matiere: matiere) {
    moveItemInArray(matiere.listeCours, event.previousIndex, event.currentIndex);
    console.log(this.matieres)
  }

}
