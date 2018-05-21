import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ElectronService } from './electron.service';
import { AccountService } from './account.service';

@Injectable()
export class ExternalService {

  public url: 'https://www.pathofexile.com/character-window/get-items';

  constructor(private http: HttpClient, private electronService: ElectronService, private accountService: AccountService) {
  }

  getCharacter(account: string, character: string, sessionId?: string): Observable<any> {
    this.setCookie(sessionId);

    const parameters = `?accountName=${account}&character=${character}`;
    return this.http.get('https://www.pathofexile.com/character-window/get-items' + parameters, { withCredentials: true });
  }

  getCharacterList(account: string) {
    const parameters = `?accountName=${account}`;
    return this.http.get('https://www.pathofexile.com/character-window/get-characters' + parameters);
  }

  setCookie(sessionId: string) {
    const cookie = {
      url: 'http://www.pathofexile.com',
      name: 'POESESSID',
      value: sessionId,
      domain: '.pathofexile.com',
      path: '/',
      secure: false,
      httpOnly: false,
      expirationDate: undefined
    };

    this.electronService.remote.session.defaultSession.cookies.set(cookie, (error) => {
      if (error) { console.error(error); }
    });
  }
}