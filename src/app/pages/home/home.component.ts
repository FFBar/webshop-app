import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cols = 3;
  category: string | undefined;
  onColumnsCountChange(columnsCount: number): void {
    this.cols = columnsCount;
  }

  onShowCategory(updatedCategory: string): void {
    this.category = updatedCategory;
  }
}
