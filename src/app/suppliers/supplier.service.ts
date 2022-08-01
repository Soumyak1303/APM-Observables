import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  throwError,
  Observable,
  of,
  map,
  tap,
  concatMap,
  mergeMap,
  switchMap,
} from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  supplierWithMap$ = of(1, 5, 8).pipe(
    map((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  supplierWithConcatMap$ = of(1, 5, 8).pipe(
    tap((id) => console.log(`concatmap o/p obs: ${id}`)),
    concatMap((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  supplierWithMergeMap$ = of(1, 5, 8).pipe(
    tap((id) => console.log(`mergemap o/p obs: ${id}`)),
    mergeMap((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  supplierWithSwitchMap$ = of(1, 5, 8).pipe(
    tap((id) => console.log(`switchmap o/p obs: ${id}`)),
    switchMap((id) => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  constructor(private http: HttpClient) {
    this.supplierWithConcatMap$.subscribe((item) =>
      console.log(`concatMap res: `, item)
    );
    this.supplierWithMergeMap$.subscribe((item) =>
      console.log(`mergeMap res: `, item)
    );

    this.supplierWithSwitchMap$.subscribe((item) =>
      console.log(`switchMap res: `, item)
    );

    // this.supplierWithMap$.subscribe(
    //   (osub) => osub.subscribe((item) => console.log(`map result:`, item)) //example of inner and outter subscribe --> HOO
    // );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
