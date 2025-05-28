// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { environment } from '../environments/environment';


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CommonModule } from '@angular/common';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: "red",
    bgsPosition: POSITION.topRight,
    bgsSize: 40,
    bgsType: SPINNER.ballSpinClockwiseFadeRotating,
    fgsType: SPINNER.doubleBounce,
    pbDirection: PB_DIRECTION.leftToRight,
    pbThickness: 5,
    pbColor: "#444791",
    fgsColor: "#444791",
};
@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            positionClass: 'toast-top-right'
        }),
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgbModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        ToastrModule,
        NgxUiLoaderModule,
    ],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: 'baseURL', useValue: environment.baseURL },
    ],
})
export class AppModule { }
