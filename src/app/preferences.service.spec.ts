import {PreferenceService} from './preferences.service';
import {ApplicablePreferencesApiResponse} from './preferences.service';
import {UserOrgPreferences} from './preferenceDetails';
import {defer} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export const asyncData = (data) => defer(() => Promise.resolve(data));
export const asyncError = (data) => defer(() => Promise.reject(data));

const mockResponseData: ApplicablePreferencesApiResponse = {
  'prefs': {
    'paymentMethodPrefs': [{
      'id': 'fa9fefb0-e592-4486-9919-575d823b75ca',
      'name': 'payment-method-unkiss'
    }, {
      'id': '857aa111-33ea-4e0a-9a98-5bcafc157af4',
      'name': 'payment-method-bummaree'
    }, {
      'id': '57652284-805a-47f8-bcee-8f96bd08c804',
      'name': 'payment-method-draftee'
    }, {
      'id': 'e29381f2-c9db-403d-a824-817cc0f4ec5a',
      'name': 'payment-method-glits'
    }, {
      'id': '2a496d52-14d4-4810-b9c9-a01db0f8928d',
      'name': 'payment-method-significancies'
    }, {'id': '1d7d2440-0d07-43c4-876b-06f232937642', 'name': 'payment-method-apparently'}],
    'transportPrefs': [{
      'id': 'c59ec250-0ad1-48c7-a7b4-698c9ca49baf',
      'name': 'transport-method-horseshoer'
    }, {
      'id': '0323e66c-6421-4e5e-85cd-164492f366b5',
      'name': 'transport-method-sanddabs'
    }, {
      'id': '2b775e04-72a1-488f-baaf-32057c6a5345',
      'name': 'transport-method-intrusions'
    }, {
      'id': 'd6366f18-3d6d-4d55-a3aa-1f4175ff65fa',
      'name': 'transport-method-coannexing'
    }, {'id': 'c937ead2-e067-4f06-a9ac-eb98baecde06', 'name': 'transport-method-nirlier'}],
    'locationPrefs': [{
      'id': 'ce7cff6f-1e05-4da7-8680-1a88c97e6991',
      'name': 'location-consimilarities'
    }, {
      'id': '5fa6f8cd-02b4-4d64-9743-f1232f81ce5d',
      'name': 'location-canoodles'
    }, {
      'id': 'b4932254-1d56-4d41-be1b-01e9a40d64e5',
      'name': 'location-multitude'
    }, {
      'id': '2e61036c-e699-4c33-b8c3-4af17ecf4419',
      'name': 'location-whatchamacallit'
    }, {
      'id': '9d513c48-4365-4c3a-acad-8583b3c0fa75',
      'name': 'location-cannelloni'
    }, {'id': 'd627c5d9-0c3c-42ff-b1bb-2f322c9327b5', 'name': 'location-endophytic'}],
    'servicePrefs': [{
      'id': '84a9ba1d-b64f-40b5-9fea-51a8af5e61ec',
      'name': 'service-photoperiod'
    }, {
      'id': '08ab1575-4d46-432a-abe5-8dd6f7c1ebbb',
      'name': 'service-pipestems'
    }, {
      'id': 'a36117f3-0a4b-491d-9b95-237fa4331df0',
      'name': 'service-hemerythrin'
    }, {
      'id': '765857e2-6b04-4e96-955a-a64ed4655821',
      'name': 'service-overplanned'
    }, {'id': '3f7dc1f5-4ef3-4450-ad47-82eb3595422a', 'name': 'service-sclerotin'}]
  }
};

describe('get UserOrgPreferences', () => {
  let preferenceService: PreferenceService;
  let httpClientSpy;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    preferenceService = new PreferenceService(<any>httpClientSpy);
  });

  describe('getApplicablePreferences endpoint', () => {
    it('get the applicable preferences', (done) => {
      const orgId = '1234';
      httpClientSpy.get.and.returnValue(asyncData(mockResponseData));
      preferenceService
        .getApplicablePreferencesForOrg(orgId)
        .subscribe((preferences: UserOrgPreferences) => {
          expect(preferences).toEqual(mockResponseData.prefs);
          expect(httpClientSpy.get).toHaveBeenCalledWith(`http://localhost:4321/applicableBidPreferences/${orgId}`);
          done();
        });
    });
    it('should return undefined if the HTTP response is empty', (done) => {
      const orgId = 'abcd';
      const httpReturnValue = {};
      httpClientSpy.get.and.returnValue(asyncData(httpReturnValue));
      preferenceService
        .getApplicablePreferencesForOrg(orgId)
        .subscribe((preferences: UserOrgPreferences) => {
          expect(preferences).toBe(undefined);
          expect(httpClientSpy.get).toHaveBeenCalledWith(`http://localhost:4321/applicableBidPreferences/${orgId}`);
          done();
        });
    });
    it('should be able to handle 500 response', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 500 error',
        status: 500,
        statusText: 'Generic server error'
      });
      httpClientSpy.get.and.returnValue(asyncError(errorResponse));
      preferenceService
        .getApplicablePreferencesForOrg('my-id')
        .subscribe(
          () => {
            fail('Expected to error but event emitted');
            done();
          },
          (err) => {
            expect(err.message).toContain('Generic server error');
            expect(err.message).toContain('500');
            expect(err.status).toBe(500);
            done();
          });
    });
  });
  describe('getSelectedPreferences endpoint', () => {
    it('should get selected preferences when called with org id', (done) => {
      httpClientSpy.get.and.returnValue(asyncData(mockResponseData));
      const orgId = 'hey-org';
      preferenceService
        .getSelectedPreferencesForOrg(orgId)
        .subscribe((preferences: UserOrgPreferences) => {
          expect(preferences).toEqual(mockResponseData.prefs);
          expect(httpClientSpy.get).toHaveBeenCalledWith(`http://localhost:4321/selectedBidPreferences/${orgId}`);
          done();
        });
    });
    it('should return undefined if the HTTP response is empty', (done) => {
      const orgId = 'abcd';
      const httpReturnValue = {};
      httpClientSpy.get.and.returnValue(asyncData(httpReturnValue));
      preferenceService
        .getSelectedPreferencesForOrg(orgId)
        .subscribe((preferences: UserOrgPreferences) => {
          expect(preferences).toBe(undefined);
          expect(httpClientSpy.get).toHaveBeenCalledWith(`http://localhost:4321/selectedBidPreferences/${orgId}`);
          done();
        });
    });
    it('should be able to handle 500 response', (done) => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 500 error',
        status: 500,
        statusText: 'Generic server error'
      });
      httpClientSpy.get.and.returnValue(asyncError(errorResponse));
      preferenceService
        .getSelectedPreferencesForOrg('my-id')
        .subscribe(
          () => {
            fail('Expected to error but event emitted');
            done();
          },
          (err) => {
            expect(err.message).toContain('Generic server error');
            expect(err.message).toContain('500');
            expect(err.status).toBe(500);
            done();
          });
    });
  });
});
