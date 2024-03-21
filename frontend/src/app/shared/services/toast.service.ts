import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

export interface ToastOptions {
	duration?: number
}

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private DEFAULT_DURATION = 5000

	constructor(private snackBar: MatSnackBar) {}

	open(message: string, action = 'Close', options?: ToastOptions) {
		return this.snackBar.open(message, action, {
			duration: options?.duration ?? this.DEFAULT_DURATION,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		})
	}

	error(message: string, action = 'Close', options?: ToastOptions) {
		return this.snackBar.open(message, action, {
			duration: options?.duration ?? this.DEFAULT_DURATION,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		})
	}
}
