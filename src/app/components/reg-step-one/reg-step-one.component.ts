import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../validators/confirm-password-validator";
import {MyErrorStateMatcher} from "../../helpers/my-error-state-matcher";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {IRegistration} from "../../models/registration";

@Component({
    selector: 'app-reg-step-one',
    standalone: true,
    imports: [
        MatButton,
        MatCheckbox,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: './reg-step-one.component.html',
    styleUrl: './reg-step-one.component.css'
})
export class RegStepOneComponent implements OnInit{
    @Output() nextHandler: EventEmitter<any> = new EventEmitter<any>();
    @Input() model: IRegistration | undefined


    form = new FormGroup({
            login: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.email
                ]
            ),
            password: new FormControl(
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).+$'),
                ]
            ),
            confirmPassword: new FormControl(
                '',
                [
                    Validators.required
                ]
            ),
            agree: new FormControl(
                false,
                [Validators.requiredTrue]
            )
        },
        {
            validators: confirmPasswordValidator("password", "confirmPassword"),
        })


    matcher = new MyErrorStateMatcher();

    isSubmitted = false;

    get login(): FormControl {
        return this.form.controls.login
    }

    get password(): FormControl {
        return this.form.controls.password
    }

    get confirmPassword(): FormControl {
        return this.form.controls.confirmPassword
    }

    get agree(): FormControl {
        return this.form.controls.agree
    }

    get showAgreeError(): boolean {
        return this.isSubmitted || this.agree?.dirty && !this.agree.untouched
    }

    ngOnInit(): void {
        if (this.model != undefined){
            this.form.controls.login.setValue(this.model.login);
            this.form.controls.password.setValue(this.model.password);
            this.form.controls.confirmPassword.setValue(this.model.password);
            this.form.controls.agree.setValue(true);
        }
    }

    submit(): void{
        this.isSubmitted = true;
        if (!this.form.invalid) {
            console.log(this.form)
            this.nextHandler.emit();
        }
    }
}
