import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-thu-chi',
  templateUrl: './list-thu-chi.component.html',
  styleUrls: ['./list-thu-chi.component.scss']
})
export class ListThuChiComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.navigateToRev()
  }

  navigateToRev() {
    this.router.navigate(['/Planning/RE/Rev']);
  }

}
