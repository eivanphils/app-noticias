import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage,
    private toastCtrl: ToastController) { 
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const exist = this.noticias.find( noti => noti.title === noticia.title);

    if (!exist) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('secondary', 'Noticias agregada a favoritos');
    }
  }

  eliminarFavorito(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('primary', 'Noticia eliminada de favoritos');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }
}
