import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { SpinnerService } from '@core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
pinToHomeScreen:any
display_UseCases = false
spinnerActive = false;

  constructor(private router: Router, private spinner: SpinnerService) { }

  ngOnInit() {
   this.getPinedItem ()
  }

  getPinedItem () {
    var usecaseArray = JSON.parse(localStorage.getItem("pinToHomeArray"))

    // remove duplicate items
    this.pinToHomeScreen = usecaseArray.filter((obj, pos, arr) => { return arr.map(mapObj =>mapObj._id).indexOf(obj._id) == pos;});

    // set filtered items to localstorage
    localStorage.setItem("pinToHomeArray",JSON.stringify(this.pinToHomeScreen))
    if (this.pinToHomeScreen != null && this.pinToHomeScreen.length != 0) {
      this.display_UseCases = true
    }
    
  }

  unPinModel(event) {
    var idAttr = event.srcElement.attributes.id;
    var usecaseId = idAttr.nodeValue;
    console.log(usecaseId)

    var usecaseArray = JSON.parse(localStorage.getItem("pinToHomeArray"))
    for (var i = 0; i < usecaseArray.length; i++) {
      if (usecaseArray[i]._id == usecaseId) {
        usecaseArray.splice(i, 1);
      }
    }
    localStorage.setItem("pinToHomeArray",JSON.stringify(usecaseArray))
    this.spinnerActive = this.spinner.start() 
    location.reload();
    this.spinnerActive = this.spinner.stop() 
  }

  runUsecase(event) {
    var idAttr = event.srcElement.attributes.id;
    var usecaseid = idAttr.nodeValue;
    console.log('this.usecaseID',usecaseid)
    for (var i = 0; i < this.pinToHomeScreen.length; i++) {
      if (this.pinToHomeScreen[i]._id == usecaseid) {
        console.log ("use case flow",this.pinToHomeScreen[i])
        var flow = this.pinToHomeScreen[i].flow
        // set workflow to localstorage
        localStorage.setItem("workflow_to_nodered",JSON.stringify (flow) );
        this.router.navigate(['/runworkflow']);
      }
    }
   }

}
