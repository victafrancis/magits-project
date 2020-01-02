import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared2/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface FavoriteGame {
  name: string;
}

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})

export class AddPlayerComponent implements OnInit {
  visible = true;
  selectable = true;
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  playerForm: FormGroup;
  RankArray: any = ['1', '2', '3', '4', '5'];
  Status: any = ['Available','Unavailable'];
  selected = null;
  selected2 = null;
  selected3 = null;
  public games = [];

  ngOnInit() {
    this.submitBookForm();
    this.playerApi.getGames().subscribe(data => {
      this.games = data;
    });

  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService
  ) {


   }

  /* Reactive book form */
  submitBookForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      games_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitPlayerForm() {
    if (this.playerForm.valid) {
      this.playerApi.AddPlayer(this.playerForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin-home'))
      });
    }
  }

  
}