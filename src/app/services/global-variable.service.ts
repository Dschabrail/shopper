import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableService {
  sideNaveOpen: boolean = true;

  constructor() {}

  checkWindowWidth() {
    if (window.innerWidth <= 1200) {
      this.sideNaveOpen = false;
    }
  }
}
