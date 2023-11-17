// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  versionApp: '1.0',
  apiUrl: 'http://localhost:2085/api',
  localUrl: 'http://localhost:4200/manage/inicio',
  localhost: 'http://localhost:4200/',
  // localUrl: 'https://barkbeat.vercel.app/manage/inicio',
  // localhost: 'https://barkbeat.vercel.app/',

  API_BREEDS : 'http://34.204.154.158:443/api/v1/breeds',
  API_DOGS: 'http://34.204.154.158:443/api/v1/dogs',
  API_LOGIN: 'http://107.21.241.233:443/api/v1/authenticate/veterinarian',
  API_OWNERS: 'http://107.21.241.233:443/api/v1/owners',
  API_REPORTS: 'http://54.226.24.48:19215/api/v1',
  API_VETS: 'http://107.21.241.233:443/api/v1/vets',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
