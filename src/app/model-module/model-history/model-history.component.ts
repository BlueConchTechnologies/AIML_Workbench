import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-model-history',
  templateUrl: './model-history.component.html',
  styleUrls: ['./model-history.component.css']
})
export class ModelHistoryComponent implements OnInit{
  showHistoryType  = "Config";
  @Input() receiveHistoryData;

  constructor() { }

  ngOnInit(): void {
    console.log()
  }

  switchTab(sw: string){
    this.showHistoryType = sw;
  }

}
