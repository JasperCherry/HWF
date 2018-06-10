import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.css']
})
export class TableOptionsComponent {

  @Input() allPagesChild: number;
  @Input() currentPageChild: number;

  @Output() passData: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageDown: EventEmitter<any> = new EventEmitter<any>();

  options: any = {
    albumId: null,
    id: null,
    title: null,
    recordsDisplayed: 50
  }

  constructor() {
    this.passData.emit(this.options);
  }

}
