import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getApiUrl() {
    if (environment.production) {
      return environment.apiOnlineUrl;
    } else {
      return environment.apiOfflineUrl
    }
  }
}
