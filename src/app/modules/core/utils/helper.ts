import * as CryptoJS from "crypto-js";
import { Constants } from "./constants";


export class Helper {
  
  static encrypt(text: string): any {
    const encrypt = CryptoJS.AES.encrypt(text, Constants.cryptoHelper);
    return btoa(encrypt.toString());
  }

  static decrypt(text: string): any {
    const decrypted = CryptoJS.AES.decrypt(atob(text), Constants.cryptoHelper);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
