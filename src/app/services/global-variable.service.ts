import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableService {
  sideNaveOpen: boolean = true;

  constructor() {}
}
