import { Injectable } from "@angular/core";
import * as Model from "../interfaces/common.interface";
import * as CryptoJS from "crypto-js";
import { BehaviorSubject, Subject } from "rxjs";
import { SETTINGS } from "../constants/constants";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userNameChange = new Subject<string>();
  public userNameChange$ = this.userNameChange.asObservable();

  constructor() { }

  /**
   * @description encrypt
   */
  encrypt(value: string): string {
    let c = CryptoJS.AES.encrypt(value, SETTINGS.ENC_KEY).toString();
    return c;
  }

  /**
   * @description decrypt value
   */
  decrypt(value: string): string {
    var bytes = CryptoJS.AES.decrypt(value, SETTINGS.ENC_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


  /**
   * @description get user details
   */
  getUserDetails(): Model.UserDetails | null {
    try {
      let userDetails: any = localStorage.getItem(SETTINGS.USER_DETAILS);
      if (userDetails) {
        userDetails = this.decrypt(userDetails);
        userDetails = JSON.parse(userDetails);
        return userDetails;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  setKeyToLS(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * @description get username on change
   */
  getUserName() {
    return this.userNameChange$;
  }
  /**
   * @description set username on profile update
   */
  setUserName(userName: string) {
    this.userNameChange.next(userName);
  }

  /**
   * @description check if user has token
   */
  hasToken() {
    try {
      if (localStorage.getItem(SETTINGS.TOKEN_KEY)) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description get token from local storage
   */
  getToken(): string | null {
    try {
      let token = localStorage.getItem(SETTINGS.TOKEN_KEY);
      if (token) {
        return token;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
