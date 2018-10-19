// import { Observable } from "rxjs";
// import { environment } from "../../environments/environment";

// declare module 'rxjs/Observable' {
//   interface Observable<T> {
//     debug: (...any) => Observable<T>;
//   }
// }
// Observable.prototype.debug = function (message: string) {
//   return this.do(
//     (next) => {
//       if (!environment.production) {
//         console.log(message, next);
//       }
//     },
//     (err) => {
//       if (!environment.production) {
//         console.log('ERROR>>', message, err);
//       }
//     },
//     () => {
//       if (!environment.production) {
//         console.log('Completed -');
//       }
//     }
//   );
// };
