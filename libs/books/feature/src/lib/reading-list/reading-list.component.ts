import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackbarRef: MatSnackBarRef<SimpleSnackBar> =
      this.snackBar.open(`You removed ${item.title} from your reading list.`, 'Undo', { duration: 5000 });
    const self: ReadingListComponent = this;
    snackbarRef.onAction().subscribe(() => {
      self.store.dispatch(addToReadingList({ book: { id: item.bookId, ...item } }));
    });
  }
}
