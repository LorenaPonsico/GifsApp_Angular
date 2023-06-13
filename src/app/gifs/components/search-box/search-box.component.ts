import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',

})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') // nos sirve para poder coger una REFERENCIA LOCAL del html sin el #, recoge el argumento de tipo string, VIEWCHILDREN SI ES UN ARRAY
  public tagInput!: ElementRef<HTMLInputElement>; // siempre va a tener un valor con este simbolo !


  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = " " // al hacer intro que no se quede la palabra añadida por el usuario en in input, si no que se quede en blanco
  }
}
