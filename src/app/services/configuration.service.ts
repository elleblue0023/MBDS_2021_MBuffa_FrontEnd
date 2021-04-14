import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  getApiUrl() {
    return 'https://assignment-backend01.herokuapp.com/api'
  }
}
