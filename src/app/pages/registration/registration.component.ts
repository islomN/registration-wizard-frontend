import {Component, OnInit, ViewChild} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCheckbox} from "@angular/material/checkbox"
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider'
import {MatButtonModule} from '@angular/material/button'
import {MatOption, MatSelect} from "@angular/material/select"
import {NgForOf, NgIf} from "@angular/common"
import {StepEnum} from "../../enums/step.enum"
import {RegistrationService} from "../../services/registration.service"
import {RegStepTwoComponent} from "../../components/reg-step-two/reg-step-two.component"
import {RegStepOneComponent} from "../../components/reg-step-one/reg-step-one.component"
import {IRegistration} from "../../models/registration"
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-registration',
    standalone: true,
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.css',
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckbox,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatSelect,
        MatOption,
        NgForOf,
        NgIf,
        RegStepTwoComponent,
        RegStepOneComponent,
        MatProgressSpinner
    ],
})
export class RegistrationComponent implements OnInit{
    @ViewChild(RegStepOneComponent, { static: false }) RegStepOneComponent!: RegStepOneComponent
    @ViewChild(RegStepTwoComponent) RegStepTwoComponent!: RegStepTwoComponent

    constructor(
        private RegistrationService: RegistrationService,
        private NotificationService: NotificationService
    ) {
    }

    step: StepEnum = StepEnum.One

    loading: boolean = false

    protected readonly StepEnum = StepEnum

    public model: IRegistration | undefined

    ngOnInit(): void {

    }

    submit(): void{
        this.loading = true;
        this.setStepTwoFields()
        this.RegistrationService
            .submit(this.model!)
            .subscribe({
                next: () => {
                    this.step = StepEnum.One
                },
                error: (e) => {
                    this.loading = false;
                    this.NotificationService.error(e);
                },
                complete: () => {
                    this.loading = false;
                    this.NotificationService.success("Registration successfully");
                    this.model = undefined;
                },
            })
    }

    next(): void {
        this.step = StepEnum.Two
        this.setStepOneFields()
    }

    prev(): void {
        this.step = StepEnum.One
    }

    private setStepOneFields(): void {
        this.setModelDefaultValue();
        this.model!.login = this.RegStepOneComponent.login.value
        this.model!.password = this.RegStepOneComponent.password.value
    }

    private setStepTwoFields(): void{
        this.model!.provinceId = this.RegStepTwoComponent.provinceId.value
    }

    private setModelDefaultValue(){
        if(this.model == undefined){
            this.model = {
                login: '',
                password: '',
                provinceId: 0
            };
        }
    }
}
