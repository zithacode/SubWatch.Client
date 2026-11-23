import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberInfo } from '../models/member.model';
import { API_CONFIG } from '../enums/api.enums';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private _http: HttpClient) {}

  updateMemberInfo(
    data: MemberInfo,
    email?: string | undefined
  ): Observable<MemberInfo> {
    return this._http.put<MemberInfo>(
      `${API_CONFIG.baseURl}${
        API_CONFIG.endpoints.auth.update
      }?email=${encodeURIComponent(email!)}`,
      data
    );
  }
}
