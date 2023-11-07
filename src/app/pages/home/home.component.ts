import { Component } from '@angular/core';

// type: object with a key of type number and a value of type number
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  customizeGrid(columnsCount: number): void {
    this.cols = columnsCount;
    // assign the value of the object with the key of the number of columns to the rowHeight variable
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(updatedCategory: string): void {
    this.category = updatedCategory;
  }
}
