import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0;
  categoriaActual = '';
  categoriaPagina = 0;

  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getToHeadLines() {
    this.headlinesPage++;
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getToHeadLinesByCategories(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPagina++;
    } else {
      this.categoriaActual = categoria;
      this.categoriaPagina = 1;
    }
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPagina}`);
  }
}
