import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit {
  
  @Input()
  //recibimos el gif
  public gif!: Gif; 
  
  ngOnInit(): void { // necesario para poder implementar en OnInit / VALIDACION
    if (!this.gif) throw new Error ('Gif property is required') 
    // throw new Error('Method not implemented.');
  }
}
