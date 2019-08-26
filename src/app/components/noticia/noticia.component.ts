import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() index: number;
  @Input() noticia: Article;
  @Input() enFavoritos: boolean;

  constructor(private iab: InAppBrowser,
              private socialSharing: SocialSharing,
              private actionSheetCtrl: ActionSheetController,
              private dataLocalService: DataLocalService,
              private platform: Platform) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log(this.noticia.url);

    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.shareNews();
        }
      },{
        text: this.enFavoritos ? 'Eliminar de Favorito' : 'Agregar a favoritos',
        icon: this.enFavoritos ? 'trash' : 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Star clicked');
          if (this.enFavoritos) {
            this.dataLocalService.eliminarFavorito(this.noticia);
          } else {
            this.dataLocalService.guardarNoticia(this.noticia);
          }
        }
      },{
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        cssClass: 'action-dark',
        handler: () => {
          console.log('close clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  shareNews() {
    if ( this.platform.is('cordova') ) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {

      if (navigator['share'] ) {

        navigator['share']({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir porque no se soporta');
      }

    }
  }
}
