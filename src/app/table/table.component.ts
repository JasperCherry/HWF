import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';
import { FilteringService } from '../services/filtering.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [PhotoService, FilteringService]
})
export class TableComponent {

  photosDataOriginal: any;
  photosData: any;
  allPages: number;
  currentPage: number;
  loadingTableData: boolean = false;

  startingOptions: any = {
    albumId: null,
    id: null,
    title: null,
    recordsDisplayed: 50
  }

  sortRising: any = {
    albumId: null,
    id: null,
    title: null
  }

  constructor(
    private _PhotoService: PhotoService,
    private _FilteringService: FilteringService
  ) {
  }

  sort(selectedField): void {
    if (this.sortRising[selectedField] === null) {
      this.sortRising[selectedField] = true;
    } else {
      this.sortRising[selectedField] = !this.sortRising[selectedField];
    }
    let keys = Object.keys(this.sortRising);
    keys.forEach(key => {
      if (key !== selectedField) {
        this.sortRising[key] = null;
      }
    })

    this.photosData = this._FilteringService.sort(selectedField, this.sortRising[selectedField], this.photosDataOriginal);
  }

  onPageUp(options: any): void {
    this.photosData = this._FilteringService.filter(options, this.photosDataOriginal, 'up');
    this.getPages();
  }

  onPageDown(options: any): void {
    this.photosData = this._FilteringService.filter(options, this.photosDataOriginal, 'down');
    this.getPages();
  }

  onPassData(options: any): void {
    this.photosData = this._FilteringService.filter(options, this.photosDataOriginal);
    this.getPages();
  }

  getPages(): void {
    this.allPages = this._FilteringService.allPages;
    this.currentPage = this._FilteringService.currentPage;
  }

  ngOnInit(): void {
    this.loadingTableData = true;
    this._PhotoService.getData()
      .subscribe(data => {
        this.photosDataOriginal = data;
        this.onPassData(this.startingOptions);
        this.loadingTableData = false;
      });
  }

}
