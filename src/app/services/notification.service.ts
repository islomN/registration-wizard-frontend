import {Injectable} from '@angular/core'
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar
    ) { }

    success(message: string) {
        this.openSnackBar(message, '', 'success-snackbar');
    }

    error(message: string) {
        this.openSnackBar(message, '', 'error-snackbar');
    }

    openSnackBar(
        message: string,
        action: string,
        className = '',
        duration = 1000
    ) {
        this.snackBar.open(message, action,{
            duration: duration,
            panelClass: className
        });
    }
}
