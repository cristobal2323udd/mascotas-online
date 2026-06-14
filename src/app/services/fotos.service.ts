import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FotosService {
  private http = inject(HttpClient);

  // Trae la URL de una foto real de perro desde la API pública dog.ceo.
  async aleatoria(): Promise<string> {
    const resp = await firstValueFrom(
      this.http.get<{ message: string; status: string }>(
        'https://dog.ceo/api/breeds/image/random',
      ),
    );
    return resp.message;
  }
}
