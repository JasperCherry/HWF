import { Injectable } from '@angular/core';

@Injectable()
export class FilteringService {

  currentPage: number = 1;
  allPages: number;
  latestOptions: any;

  constructor() { }

  filterByFieldValues(options: any, photosData: any) {

    if (options.albumId !== null) {
      photosData = photosData.filter((photo) => {
        if (photo.albumId === options.albumId) {
          return true;
        } else {
          return false;
        }
      })
    }

    if (options.id !== null) {
      photosData = photosData.filter((photo) => {
        if (photo.id === options.id) {
          return true;
        } else {
          return false;
        }
      })
    }

    if (options.title !== null && this.latestOptions.title !== "") {
      photosData = photosData.filter((photo) => {
        if (photo.title.indexOf(options.title) !== -1) {
          return true;
        } else {
          return false;
        }
      })
    }

    return photosData;
  }

  sort(selectedField: string, ifRising: boolean, photosDataOriginal: any) {
    let photosData = photosDataOriginal;

    photosData = this.filterByFieldValues(this.latestOptions, photosData);

    let sortByProperty = function(property) {
      return function(x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
    };

    photosData.sort(sortByProperty(selectedField));
    if (!ifRising) {
      photosData.reverse();
    }

    photosData = photosData.filter((photo, index) => {
      if (index >= this.latestOptions.recordsDisplayed * (this.currentPage - 1) && index < this.latestOptions.recordsDisplayed * this.currentPage) {
        return true;
      } else {
        return false;
      }
    })

    return photosData;
  }

  filter(options: any, photosDataOriginal: any, pageUp: any = null): any {
    this.latestOptions = options;
    let photosData: any = photosDataOriginal;

    photosData = this.filterByFieldValues(options, photosData);

    if (pageUp === 'up') {
      if (options.recordsDisplayed * this.currentPage < photosData.length) {
        this.currentPage++;
      }
    } else if (pageUp === 'down') {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    } else if (pageUp === null) {
      this.currentPage = 1;
    }

    if (photosData.length / options.recordsDisplayed === Math.floor(photosData.length / options.recordsDisplayed)) {
      this.allPages = (photosData.length / options.recordsDisplayed);
    } else {
      this.allPages = Math.floor(photosData.length / options.recordsDisplayed) + 1;
    }

    photosData = photosData.filter((photo, index) => {
      if (index >= options.recordsDisplayed * (this.currentPage - 1) && index < options.recordsDisplayed * this.currentPage) {
        return true;
      } else {
        return false;
      }
    })

    return photosData;
  }
}
