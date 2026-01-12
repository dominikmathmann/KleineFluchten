import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Escape, EscapeAdd, EscapeKey} from './models';
import {map} from 'rxjs';
import {distanceInKm} from './utils';

@Injectable({
  providedIn: 'root',
})
export class Firebase {

  http = inject(HttpClient);

  // TODO add real
  login(username: string, password: string) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
      {
        "email": "dadom.mobile@gmail.com",
        "password": "Fluchten1337!",
        "returnSecureToken": true
      }
    )
  }

  refresh(refreshToken: string) {
    return this.http.post<any>(
      'https://securetoken.googleapis.com/v1/token?key=' + environment.apiKey,
      'grant_type=refresh_token&refresh_token=' + refreshToken,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  }

  loadEscapes(token: string) {
    return this.http.get<any>(
      'https://firestore.googleapis.com/v1/projects/kleinefluchten/databases/(default)/documents/escapes',
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    ).pipe(
      map(escapes => this.mapEscapeDocuments(escapes.documents))
    );
  }

  createEscape(escape: EscapeAdd, token: string) {
    return this.http.post<void>(
      'https://firestore.googleapis.com/v1/projects/kleinefluchten/databases/(default)/documents/escapes',
      this.mapEscape(escape),
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    )
  }

  mapEscape(escape: EscapeAdd) {
    return {
      "fields": {
        "coordinates": {
          "stringValue": escape.coordinates
        },
        "title": {
          "stringValue": escape.title
        },
        "locationType": {
          "stringValue": escape.locationType
        },
        "notes": {
          "stringValue": escape.notes
        },
        "image": {
          "stringValue": escape.image
        },
        "url": {
          "stringValue": escape.url
        },
        "offers": {
          "arrayValue": {
            "values": escape.offers ? escape.offers.filter(o => o.offered).map(o => ({"stringValue": o.offerType})) : []
          }
        }
      }
    };
  }

  mapEscapeDocuments(escapeDocuments: any[]): Escape[] {
    return escapeDocuments.map(escapeDocument => {
      const escape = {
        id: escapeDocument.name
      } as Escape;

      const keys: EscapeKey[] = [
        'title',
        'image',
        'url',
        'notes',
        'locationType',
        'coordinates',
        'offers'
      ];
      // @ts-ignore
      keys.forEach(field => escape[field] = this.extract(escapeDocument.fields[field]) as any);
      escape.offers = escape.offers?.values ? (escape.offers.values as unknown as any[]).map(key => this.extract(key)):[];
      escape.distance = distanceInKm(environment.home, escape.coordinates);
      return escape;
    });
  }

  extract(s: any): any {
    return s?.[Object.keys(s)[0]];
  }
}
