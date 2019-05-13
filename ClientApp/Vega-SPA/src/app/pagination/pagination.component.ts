import { Component,  OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input('total-items') totalItems;
  @Input('page-size') pageSize = 10;
  @Output('page-changed') pageChanged = new EventEmitter();
  pages: any[];
  curretnPage = 1;
  constructor() { }

  ngOnChanges() {
    this.curretnPage = 1;
    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (let i = 0 ; i <= pagesCount ; i++) {
      this.pages.push(i);
    }
    console.log('pages', this);
  }

  changePage(page) {
    this.curretnPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    if (this.curretnPage === 1) {
      return ;
    }
    this.curretnPage--;
    this.pageChanged.emit(this.curretnPage);
  }
  next() {
    if (this.curretnPage === this.pages.length) {
      return ;
    }
    this.curretnPage++;
    this.pageChanged.emit(this.curretnPage);
  }

}
