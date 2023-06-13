import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // root para que sea global, para que este disponible a lo largo de toda la app y modulos que inyecten este servicio
export class GifsService {


    private _tagsHistory: string[] = [];
    private apiKey:       string = 'oFfmR5KOtVQMkuKTsr6aGRvMzo4s9iOg';
    private serviceUrl:   string = 'https://api.giphy.com/v1/gifs'; 


    constructor(private http: HttpClient) { }


    get tagsHistory() {
        return [...this._tagsHistory] // ... para cear una copia
    }

    private organizeHistory(tag: string) { // metodo para organizar el historial
        tag = tag.toLowerCase(); // pasarlo todo a minuscula para hacer la bsuqueda y validacion

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag) // filter sirve para devolver nuevo array con todos los elementos cuya funcion devuelvan verdadero
            //oldTag es un tag que ya esta almacenado, si ese oldtag es diferente al que estoy recibiendo lo voy a dejar pasar, el que sea igual la condicion no se cumple y no lo devuelve, lo rechaza
        }
        this._tagsHistory.unshift(tag); // inserto un nuevo tag al inicio
        this._tagsHistory = this.tagsHistory.splice(0, 10);

    }

    searchTag(tag: string): void { // objetivo de la funcion: buscar los valores del tag

        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)


        this.http.get('${ this.serviceUrl }/search', { params })
            .subscribe(resp => {
                console.log(resp)
            })
    }
}


// fetch()
//     .then(resp => resp.json())
//     .then(data => console.log(data))