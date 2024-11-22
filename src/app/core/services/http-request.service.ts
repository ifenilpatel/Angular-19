import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TOKEN } from '../constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  httpClient = inject(HttpClient);
  tokenService = inject(TokenService);

  constructor() {}

  handleRequest<T>(
    endpoint: string,
    data: any,
    withCredentials: boolean = true,
    addHeaders: boolean = false
  ): Observable<T> {
    // Initialize the options object
    const httpOptions: { headers?: HttpHeaders; withCredentials: boolean } = {
      withCredentials: withCredentials,
    };

    // Add headers if the flag is true
    if (addHeaders) {
      httpOptions.headers = new HttpHeaders({
        authorization:
          'Bearer ' + this.tokenService.fetchToken(TOKEN.CURRENT_TOKEN) || '',
      });
    }

    return this.httpClient.post<T>(
      `${environment.backend}${endpoint}`,
      data,
      httpOptions
    );
  }
}
