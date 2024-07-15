import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmPasswordValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passwordControl = formGroup.get(passwordControlName);
        const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null;
        }

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['confirmPasswordValidator']) {
            return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ confirmPasswordValidator: true });
        } else {
            confirmPasswordControl.setErrors(null);
        }

        return null;
    };
}
