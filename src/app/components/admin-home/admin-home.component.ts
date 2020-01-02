import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Player } from 'src/app/shared2/player';
import { ApiService } from 'src/app/shared2/api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  PlayerData: any =[];
  dataSource: MatTableDataSource<Player>;
  player:string;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  displayedColumns: string[] = ['player', 'rank', 'score', 'time','games_played','status','action'];

  constructor(private playerApi: ApiService) {
    this.playerApi.GetPlayers().subscribe(data =>{
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
   }

  ngOnInit() {
  }

  // applying the filters to search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePlayer(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe()
    }
  }

}
