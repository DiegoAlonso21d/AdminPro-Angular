import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import {  filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {

  public titulo:string="";

  constructor(private router: Router) {
  
  }
}
