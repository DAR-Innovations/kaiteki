import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ToastrOptions {
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private DEFAULT_DURATION = 5000;

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string = 'Close', options?: ToastrOptions) {
    return this.snackBar.open(message, action, {
      duration: options?.duration ?? this.DEFAULT_DURATION,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
