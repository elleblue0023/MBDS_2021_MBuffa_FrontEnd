import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getApiUrl() {
    if (environment.isOnline ) {
      return environment.apiOnlineUrl;
    } else {
      return environment.apiOfflineUrl
    }
  }
}
