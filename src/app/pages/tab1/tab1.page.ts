import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) ionInfinite: IonInfiniteScroll;

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {

    this.noticiasService.getToHeadLines().subscribe(
      (data) => {
        if (data.articles.length === 0) {
          event.target.complete();
          this.ionInfinite.disabled = true;
          return;
        }

        this.noticias.push(...data.articles);

        if (event) {
          event.target.complete();
        }
      }
    );
  }
}
