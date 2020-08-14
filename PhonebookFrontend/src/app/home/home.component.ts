import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatSort
} from '@angular/material/sort';
import {
  Entry
} from './../_models/Entry';
import {
  MatCard
} from '@angular/material/card';
import {
  MatFormField
} from '@angular/material/form-field';
import {
  ApiService
} from './../api.service';
import {
  UploadComponent
} from './../upload/upload.component';
import {
  EditComponent
} from './../edit/edit.component';
import {
  MatIcon
} from '@angular/material/icon';
import {
  MatButton
} from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class HomeComponent implements OnInit {
  entries: Entry[] = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'number', 'edit'];
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;
  latestfilter: string;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  async ngOnInit(): Promise < void > {
    await this.api.getPhonebookWithPromise().then(data => {
      for (var x in data) {
        var entry = new Entry();
        entry.id = data[x].id;
        entry.firstName = data[x].firstName;
        entry.lastName = data[x].lastName;
        entry.number = data[x].number;
        this.entries.push(entry);
      }
      this.dataSource.data = this.entries;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.latestfilter = filterValue;
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '5000',
    });

    dialogRef.afterClosed().subscribe(async result => {
      await this.api.getPhonebookWithPromise().then(data => {
        var temp: Entry[] = [];
        for (var x in data) {
          var entry = new Entry();
          entry.id = data[x].id;
          entry.firstName = data[x].firstName;
          entry.lastName = data[x].lastName;
          entry.number = data[x].number;
          temp.push(entry);
        }
        this.dataSource.data = temp;
      });
    });
  }

  openEditDialog(entry: Entry) {
    let config = new MatDialogConfig();
    config.data = entry;
    const dialogRef = this.dialog.open(EditComponent, config);
    dialogRef.afterClosed().subscribe(async result => {
      await this.api.getPhonebookWithPromise().then(data => {
        var temp: Entry[] = [];
        for (var x in data) {
          var entry = new Entry();
          entry.id = data[x].id;
          entry.firstName = data[x].firstName;
          entry.lastName = data[x].lastName;
          entry.number = data[x].number;
          temp.push(entry);
        }
        this.dataSource.data = temp;
      });
    });
  }
}
