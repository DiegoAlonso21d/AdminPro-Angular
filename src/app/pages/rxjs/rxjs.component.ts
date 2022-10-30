import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy } from '@angular/core';
import { Observable, retry ,interval, Subscription} from 'rxjs';
import {map, take,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription = new Subscription;

  constructor() {
    /*    this.retornaObservable().pipe(retry()).subscribe(
       (valor) => console.log('Subs:', valor),
       (err) => console.warn('Error', err),
       () => console.info('Obs Terminado')
     ); */

   this.intervalSubs=  this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {}

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(100).pipe(
      take(100),
      map((valor) => {
        return valor + 1;
      }),
      filter(valor=>(valor%2===0? true :false ))
    );
    return intervalo$;
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          console.log('i=2....error');
          observer.error('I llego al valor de 2');
        }
      }, 1000);
    });
  }
}
