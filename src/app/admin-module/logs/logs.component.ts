import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../_services/log/log.service';
import { Log } from '../../_services/log/log';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  Logs: any = [];
  displayedColumns: string[] = ['id', 'date', 'log']
  dataSource: MatTableDataSource<Log>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private logApi: LogService
  ) 
  { 
    this.logApi.GetLogs().subscribe(data => {
      this.Logs = data;
      this.dataSource = new MatTableDataSource<Log>(this.Logs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() {
  }

}
