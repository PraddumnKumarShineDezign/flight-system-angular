import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

//third-party
import { ToastrService } from "ngx-toastr";
// import { NgxSpinnerService } from "ngx-spinner";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private renderer: Renderer2;
  private apiKey = "AIzaSyCggNbfXfL_Kl9ov5AKkqtnA9WPj-Y6IYk"; // Replace with your key
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(msg: string) {
    msg = msg ? msg : "Something went wrong";
    this.toastr.error(msg);
  }

  showSpinner() {
    this.spinner.start();
  }

  hideSpinner() {
    this.spinner.stop();
  }


  setKeyToLS(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  dateFormat(date: string) {
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      return { startDate, endDate };
    }
    return null;
  }
}  
