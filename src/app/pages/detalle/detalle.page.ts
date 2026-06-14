import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonChip, IonLabel, IonButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, heart } from 'ionicons/icons';
import { PerrosService, Perro } from '../../services/perros.service';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.page.html',
  styleUrls: ['detalle.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonChip, IonLabel, IonButton, IonIcon,
  ],
})
export class DetallePage implements ViewWillEnter {
  private route = inject(ActivatedRoute);
  private servicio = inject(PerrosService);
  perro?: Perro;

  constructor() {
    addIcons({ checkmarkCircle, heart });
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.perro = await this.servicio.obtener(id);
  }

  async adoptar() {
    if (!this.perro) return;
    await this.servicio.adoptar(this.perro.id);
    this.perro = { ...this.perro, adoptado: true };
  }
}
