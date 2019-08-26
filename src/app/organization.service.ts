import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {prop} from 'ramda';

import {preferencesApiUrl} from '../environments/environment';

import {Organization} from './organization';
import {Observable, of} from 'rxjs';

class OrganizationApiResponse {
  organizations: Organization[];
}


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private organizationsUrl = `${preferencesApiUrl}/organizations`;  // URL to web api

  constructor(private http: HttpClient) {
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<OrganizationApiResponse[]>(this.organizationsUrl).pipe(
      delay(1),
      map(prop('organizations')),
    );
  }
}

export const mockOrgData: Organization[] = [
  {
    'id': '4e2f0189-036e-4ac9-b65f-c97a2967f62e',
    'originId': '9515',
    'name': 'crescendoing-unperfection'
  },
  {
    'id': '5d0e0896-34b1-4291-a298-29bc7200847f',
    'originId': '9516',
    'name': 'substituting-nostopathies'
  },
  {
    'id': '0cdf981e-ff79-428c-887f-a63bec95aa5d',
    'originId': '9517',
    'name': 'ovicides-tamein'
  },
  {
    'id': '28421eaf-28d8-4eae-bb21-15481f65fcf1',
    'originId': '9518',
    'name': 'pfenning-meritorious'
  },
  {
    'id': 'e6753bfb-ec04-4b9e-873c-cc0412d7ae42',
    'originId': '9519',
    'name': 'mindednesses-reflectorising'
  },
  {
    'id': '35bcc869-be73-4973-a121-107542a9aaed',
    'originId': '9520',
    'name': 'herling-hotty'
  },
  {
    'id': 'f7827502-08d0-44f7-84d2-6655a42aa774',
    'originId': '9521',
    'name': 'sniggered-squattinesses'
  },
  {
    'id': '608390f7-903d-4dce-906d-ac154dc65e48',
    'originId': '9522',
    'name': 'vignettes-poolers'
  },
  {
    'id': 'bf96625f-9dc8-48a1-8f3f-cac3650cd740',
    'originId': '9523',
    'name': 'matronage-pitchpipes'
  },
  {
    'id': '79ff3e98-f107-4e99-bb18-64f1c8eae8fd',
    'originId': '9524',
    'name': 'supersize-algid'
  },
  {
    'id': '16ea57d2-f77b-49e2-bb2a-11c49bd14ccb',
    'originId': '9525',
    'name': 'morbidly-paitrick'
  },
  {
    'id': '254c4476-ca21-4977-858c-c7372ace9f9d',
    'originId': '9526',
    'name': 'beechwoods-malleating'
  }
];

