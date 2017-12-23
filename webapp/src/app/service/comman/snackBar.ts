import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material'

@Injectable()
export class SnackBar {
   
    constructor(public snackBar: MatSnackBar) { }
    openSnackBar(message: string,action:string="Close") {
        this.snackBar.open(message, action, {
          duration: 1000
        });
      }
    
}