import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared2/api.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Game } from 'src/app/shared2/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  GameData: any = [];
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'platform', 'genre', 'rating','publisher','release','status'];

  constructor(private playerApi: ApiService) { 
    this.playerApi.getGames().subscribe(data => {
      this.GameData = data;
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
      setTimeout(()=>{
        this.dataSource.paginator = this.paginator;
      })
    });
  
  }

  ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
