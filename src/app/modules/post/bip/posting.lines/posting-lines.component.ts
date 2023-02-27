import { Component, OnInit } from '@angular/core';
import usersData from './_postinglLines';
@Component({
  selector: 'app-posting-lines',
  templateUrl: './posting-lines.component.html',
  styleUrls: ['./posting-lines.component.scss']
})
export class PostingLinesComponent implements OnInit {
  usersData = usersData;
  columns = [
    'DOS',
    'CPT',
    'provider',
    'billed',
    'pmts',
    'PmtAmt',
    'adjust',
    'balance',
    'sessionAction'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
