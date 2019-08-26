import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) ionInfinite: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = 'business';

    this.cargarNoticas(this.segment.value);
  }

  changeCategory(event) {
    this.segment.value = event.detail.value;

    this.noticias = [];
    this.cargarNoticas(this.segment.value);
  }

  cargarNoticas(categoria: string, event?) {
    this.noticiasService.getToHeadLinesByCategories(categoria)
    .subscribe((data) => {
      if (data.articles.length === 0) {
        event.target.complete();
        this.ionInfinite.disabled = true;
        return;
      }

      this.noticias.push(...data.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticas(this.segment.value, event);
  }
}
