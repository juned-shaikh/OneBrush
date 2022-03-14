import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-screen-content',
  templateUrl: './screen-content.component.html',
  styleUrls: ['./screen-content.component.scss']
})
export class ScreenContentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  displayedColumns: string[] = ['sNo', 'screen', 'content', 'action','delete'];

  displayStyles: any = "none";
  displayStyle: any = "none";
  constructor() { }

  ngOnInit(): void {
  }



  openPopup() {
    this.displayStyle= "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
