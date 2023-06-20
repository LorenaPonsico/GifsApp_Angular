import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' }) // root para que sea global, para que este disponible a lo largo de toda la app y modulos que inyecten este servicio
export class GifsService {

    public gifList: Gif[] = []

    private _tagsHistory: string[] = [];
    private apiKey: string = 'oFfmR5KOtVQMkuKTsr6aGRvMzo4s9iOg';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) { // cuando se inyecte el servicio llamare al local storage
        this.loadLocalStorage();
        console.log("Gifs Service Ready")
     }

    get tagsHistory() {
        return [...this._tagsHistory] // ... para cear una copia / GET para poder desestructurar y poder usar las propiedades (primero creando una propieda privada)
    }

    private organizeHistory(tag: string) { // metodo para organizar el historial
        tag = tag.toLowerCase(); // pasarlo todo a minuscula para hacer la bsuqueda y validacion

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag) // filter sirve para devolver nuevo array con todos los elementos cuya funcion devuelvan verdadero
            //oldTag es un tag que ya esta almacenado, si ese oldtag es diferente al que estoy recibiendo lo voy a dejar pasar, el que sea igual la condicion no se cumple y no lo devuelve, lo rechaza
        }
        this._tagsHistory.unshift(tag); // inserto un nuevo tag al inicio
        this._tagsHistory = this.tagsHistory.splice(0, 10); // solo mestro las 10 ultimas busquedas
        this.saveLocalStorage(); // llamo a la funcion para almacenar en el local storage
    }

    private saveLocalStorage(): void { // LOCAL STORAGE NO SE IMPORTA, es para guardar en el local storage el historial de busqueda
        localStorage.setItem('history', JSON.stringify(this._tagsHistory)); // stringify convierte mi objeto en string
    }
    private loadLocalStorage(): void { //cargar el local storage
        if (!localStorage.getItem('history')) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // parse me devuelve el objeto antes de haberse convertido en string
        //  not null operator ! 
        if(this._tagsHistory.length === 0) return; // si no hay historial se devuelve
        this.searchTag(this._tagsHistory[0]); // si hay mas de un elemento 

    }

    

    searchTag(tag: string): void { // objetivo de la funcion: buscar los valores del tag

        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams() // esto ya esta creado (no hay q importar), parametros
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)


        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }) // esto es un observable q escucha los valores que emite
            .subscribe(resp => {

                this.gifList = resp.data

            })
    }
}