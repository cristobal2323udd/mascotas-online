import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonList, IonItem, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonToggle, IonButton, IonText, IonSpinner,
} from '@ionic/angular/standalone';
import { PerrosService } from '../../services/perros.service';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: 'nuevo.page.html',
  styleUrls: ['nuevo.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonList, IonItem, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonToggle, IonButton, IonText, IonSpinner,
  ],
})
export class NuevoPage {
  private servicio = inject(PerrosService);
  private fotos = inject(FotosService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  cargandoFoto = false;

  form = this.fb.nonNullable.group({
    foto: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    raza: ['', Validators.required],
    edad: ['', Validators.required],
    tipo: ['Perro', Validators.required],
    sexo: ['Macho', Validators.required],
    tamano: ['Mediano', Validators.required],
    vacunada: [false],
    descripcion: ['', Validators.required],
  });

  invalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && control.touched;
  }

  // Le pide la foto al servicio (que habla con la API) y la pone en el formulario.
  async fotoAleatoria() {
    this.cargandoFoto = true;
    try {
      this.form.patchValue({ foto: await this.fotos.aleatoria() });
    } finally {
      this.cargandoFoto = false;
    }
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = this.form.getRawValue();
    await this.servicio.agregar({
      nombre: datos.nombre.trim(),
      tipo: datos.tipo,
      raza: datos.raza.trim(),
      edad: datos.edad.trim(),
      sexo: datos.sexo,
      tamano: datos.tamano,
      vacunada: datos.vacunada,
      descripcion: datos.descripcion.trim(),
      foto: datos.foto.trim() || 'https://placedog.net/600/600?id=20',
      adoptado: false,
    });
    this.router.navigateByUrl('/');
  }
}
