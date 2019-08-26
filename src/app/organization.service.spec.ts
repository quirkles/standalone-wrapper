import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {OrganizationService} from './organization.service';
import {preferencesApiUrl} from '../environments/environment';
import {Organization} from './organization';


describe('getOrganizations()', () => {

  let httpMock: HttpTestingController;
  let organizationService: OrganizationService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], providers: [OrganizationService]
    });

    organizationService = TestBed.get(OrganizationService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('get the orgs', (done) => {
    const mockResponseData = {
      'organizations': [{
        'id': 'ALEX-af99-4bf6-9078-bf8dfc157a30', 'originId': '5953', 'name': 'heliolater-amphibiousnesses'
      }, {
        'id': 'dd739fe4-d62f-4f7a-babd-14eed1b1f014', 'originId': '5954', 'name': 'decidual-protoctists'
      }]
    };


    organizationService
      .getOrganizations()
      .subscribe((organizations: Organization[]) => {
        expect(organizations).toEqual(mockResponseData.organizations);
        done();
      });

    const _request = httpMock.expectOne(`${preferencesApiUrl}/organizations`);
    expect(_request.request.method).toEqual('GET');
    _request.flush(mockResponseData);

  });

});
