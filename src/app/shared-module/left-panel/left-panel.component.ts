import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  route: string;

  constructor(private router: Router) {
    
   }

  ngOnInit() {
    // console.log(this.router.url.split('home/')[1]);
    // console.log( window.location.href);
    //   const $links = $('.sidebar ul li a');
    //   $.each($links, function (index, link) {
       
    //     // console.log("this.route",this.router.url)
    //     if (link.href == this.route) {
    //       $(this).addClass('active');
    //     }
    //   });
   
  
  }

}
