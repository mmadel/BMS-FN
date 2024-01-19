import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-payer',
  templateUrl: './landing-payer.component.html',
  styleUrls: ['./landing-payer.component.scss']
})
export class LandingPayerComponent implements OnInit {
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  createPayerVisibility: boolean;
  viewPayerVisibility: boolean;
  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/img/sim/angular.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/sim/angular.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/img/sim/angular.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  }
  togglepayerCreation() {
    this.createPayerVisibility = !this.createPayerVisibility;
  }
  togglepayerList() {
    this.viewPayerVisibility = !this.viewPayerVisibility;
  }
  changeVisibility(event: any) {
    if (event === 'close')
      this.createPayerVisibility = false;
  }
  changePayerLisrVisibility(event: any) {
    if (event === 'close')
      this.viewPayerVisibility = false;
  }

}
