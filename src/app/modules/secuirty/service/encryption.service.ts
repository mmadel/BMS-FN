import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
   public encrypt(txt: string): string {
    var hash = CryptoJS.SHA1('0123456789123456');
    var key = CryptoJS.lib.WordArray.create(hash.words.slice(0, 16 / 4));
    let encrypted = CryptoJS.AES.encrypt(txt, key, {
      mode: CryptoJS.mode.ECB,
    });
    return encrypted.toString();
  }
}
