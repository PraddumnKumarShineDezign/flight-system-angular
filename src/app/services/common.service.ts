import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";


@Injectable({
  providedIn: "root",
})
export class CommonService {


  constructor(
    private toastr: ToastrService,
    private spinner: NgxUiLoaderService,
  ) {
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
