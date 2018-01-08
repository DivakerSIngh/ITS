import { Injectable } from '@angular/core';
import * as _ from 'underscore';
@Injectable()
export class PagerService {

  constructor() { }

      getPager(totalItems: number, currentPage: number = 1, pageSize: number = 2) {
     
      let totalPages = Math.ceil(totalItems / pageSize);

      let startPage: number, endPage: number;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // create an array of pages to ng-repeat in the pager control"it is the main field for pagination"
      let pages = _.range(startPage, endPage + 1);

          return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          pages: pages
      };
  }
}