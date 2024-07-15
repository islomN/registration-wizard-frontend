import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {CountryService} from "../../services/country.service";
import {ProvinceService} from "../../services/province.service";
import {MyErrorStateMatcher} from "../../helpers/my-error-state-matcher";

@Component({
    selector: 'app-reg-step-two',
    standalone: true,
    imports: [
        MatButton,
        MatError,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule,
        MatAnchor
    ],
    templateUrl: './reg-step-two.component.html',
    styleUrl: './reg-step-two.component.css'
})
export class RegStepTwoComponent implements OnInit {
    @Output() prevHandler: EventEmitter<any> = new EventEmitter<any>()

    @Output() submitHandler: EventEmitter<any> = new EventEmitter<any>()

    constructor(
        protected CountryService: CountryService,
        protected ProvinceService: ProvinceService
    ) {
    }

    form = new FormGroup({
        countryId: new FormControl(
            0,
            [
                Validators.required
            ]
        ),
        provinceId: new FormControl(
            0,
            [
                Validators.required
            ]
        )
    })

    matcher = new MyErrorStateMatcher();

    get countryId(): FormControl {
        return this.form.controls.countryId;
    }

    get provinceId(): FormControl {
        return this.form.controls.provinceId;
    }

    ngOnInit(): void {
        this.CountryService.get().subscribe();
    }

    submit(): void {
        if (!this.form.invalid){
            this.submitHandler.emit();
        }
    }

    prev(): void  {
        this.prevHandler.emit();
    }

    getProvincesByCountry(): void  {
        this.form.controls.provinceId.reset();
        this.ProvinceService.get(this.countryId.value).subscribe();
    }
}
