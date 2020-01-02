import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared2/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})

export class EditPlayerComponent implements OnInit {
  visible = true;
  selectable = true; //used for the chiplist
  removable = true; //used for the chiplist
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  playerForm: FormGroup; //Form name
  RankArray: any = ['1', '2', '3', '4', '5'];
  Status: any = ['Available','Unavailable'];
  selected = null;
  selected2 = null;
  selected3 = null;
  public games = [];


  ngOnInit() {
    this.updateBookForm();
    this.playerApi.getGames().subscribe(data => {
      this.games = data;
    });
    
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService

  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerForm = this.fb.group({
        player: [data.player, [Validators.required]],
        rank: [data.rank, [Validators.required]],
        score: [data.score, [Validators.required]],
        time: [data.time, [Validators.required]],
        games_played: [data.games_played, [Validators.required]],
        status: [data.status, [Validators.required]]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      games_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    if (input) {
      input.value = '';
    }
  }

 
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home'))
      });
    }
  }
  
}