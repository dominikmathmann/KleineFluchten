import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Escape, EscapeAdd, EscapeKey, Track, TrackKey} from './models';
import {map} from 'rxjs';
import {distanceInKm} from './utils';

@Injectable({
  providedIn: 'root',
})
export class Firebase {

  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
      {
        email,
        password,
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

  loadTracks(token: string) {
    return this.http.get<any>(
      'https://firestore.googleapis.com/v1/projects/kleinefluchten/databases/(default)/documents/tracks',
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    ).pipe(
      map(escapes => this.mapTrackDocuments(escapes.documents))
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


  updateEscape(field: string, id: string, value: any, valueType: string,  token: string) {
    const requestFieldValue : any = {};
    requestFieldValue[valueType] = value;

    const request:any = {
      fields: {}
    }
    request.fields[field] = requestFieldValue;


    return this.http.patch<void>(
      `https://firestore.googleapis.com/v1/${id}?updateMask.fieldPaths=${field}`,
      request,
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
        "voting": {
          "integerValue": -1,
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
        'offers',
        'voting'
      ];
      // @ts-ignore
      keys.forEach(field => escape[field] = this.extract(escapeDocument.fields[field]) as any);
      escape.offers = escape.offers?.values ? (escape.offers.values as unknown as any[]).map(key => this.extract(key)) : [];
      escape.distance = distanceInKm(environment.home, escape.coordinates);
      return escape;
    }).sort((a, b) => a.distance - b.distance);
  }

  mapTrackDocuments(trackDocuments: any[]): Track[] {
    return trackDocuments.map(trackDocument => {
      const track = {
        id: trackDocument.name
      } as Track;

      const keys: TrackKey[] = [
        'title',
        'url',
        'notes',
        'coordinates',
        'gpx',
        'attributes'
      ];
      // @ts-ignore
      keys.forEach(field => track[field] = this.extract(trackDocument.fields[field]) as any);
      track.attributes = track.attributes?.values ? (track.attributes.values as unknown as any[]).map(key => this.extract(key)) : [];
      track.distance = distanceInKm(environment.home, track.coordinates);
      return track;
    }).sort((a, b) => a.distance - b.distance);
  }

  extract(s: any): any {
    return s?.[Object.keys(s)[0]];
  }
}
