import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '@core/services';
import { CaseStudyService } from '../services/case-study.service';
import { ToastrCode, SpinnerService } from '@core';
import { DOCUMENT } from '@angular/common';
import { DesignWorkflowService } from '../services/design-workflow.service';



@Component({
  selector: 'app-display-workflow',
  templateUrl: './display-workflow.component.html',
  styleUrls: ['./display-workflow.component.css']
})
export class DisplayWorkflowComponent implements OnInit {
  [x: string]: any;
  // workflow_name :any;
  constructor(private _caseStudyService: CaseStudyService, private router: Router, private toastService: ToastrService, private spinner: SpinnerService, private formBuilder: FormBuilder, private designWorkflowService: DesignWorkflowService) { }
  workflow_data: any;
  workFlowName: any;
  workflowDescription: any;
  trainTrackerIdLength: any;
  FirstModelTrainTrackerId: any;
  firstModel_type: any;
  SecondModelTrainTrackerId: any;
  secondModel_type: any;
  firstModel_algorithm_names: any;
  secondModel_algorithm_names: any;

//non tranable model
  display_tableExtractor = false;
  display_textSummarization = false;
  display_sentimentClassification = false;
  display_VideoAnalytics = false;
  display_ObjectDetection = false;
  display_QNA_KB = false;
  display_TicketClassification = false;
  display_TermsExtraction = false;
  display_TextExtraction = false;
  display_InvoiceExtraction = false;
  display_InstanceSegmentation = false;
  display_DuplicatePrediction = false;
  display_FaceRecognotion = false;
  display_DocumentClassification = false;

  // tranable model
  
  display_TimeSeries = false;
  display_Classification = false;
  display_AnamolyDetection = false;
  display_NER = false;
  display_VoiceClassification = false;
  display_SpeakerDiarization = false;
  display_ProductCategorization = false;
  


  ngOnInit(): void {
    this.getWorkflowData();
    this.runWorkflowForm = this.formBuilder.group({
      name: '',
      description: ''
    })
  }

  // get workflowdata from nodered
  getWorkflowData() {
    // get workflowdata from nodered
    this.workflow_data = JSON.parse(localStorage.getItem('workflow_to_nodered'));
    console.log('workflow_data', this.workflow_data);

    // set workflowname to UI
    this.workFlowName = this.workflow_data[0]['label']
    this.workflowDescription = this.workflow_data[0]['info']

    // get trainingrackerId from nodered flow data
    var wire_data;

    for (var i = 0; i < this.workflow_data.length; i++) {
      this.trainTrackerIdLength = this.workflow_data.length - 1

      // get traintrackerId for model and check the wire connected node
      if (this.trainTrackerIdLength <= 1) {
        this.FirstModelTrainTrackerId = this.workflow_data[1].trainingTracker_id
        this.firstModel_type = this.workflow_data[1].original_model_name
        this.firstModel_algorithm_names = this.workflow_data[1].algorithm_names
      }
      else if (this.workflow_data[i].wires != null) {
        if (this.workflow_data[i].wires[0].length == 0) {
          this.SecondModelTrainTrackerId = this.workflow_data[i].trainingTracker_id
          this.secondModel_type = this.workflow_data[i].original_model_name
          this.secondModel_algorithm_names = this.workflow_data[i].algorithm_names

        }
        else {
          this.FirstModelTrainTrackerId = this.workflow_data[i].trainingTracker_id
          this.firstModel_type = this.workflow_data[i].original_model_name
          this.firstModel_algorithm_names = this.workflow_data[i].algorithm_names
        }
      }
    }
    localStorage.setItem("FirstModelTrainTrackerId", this.FirstModelTrainTrackerId);
    localStorage.setItem('SecondModelTrainTrackerId', this.SecondModelTrainTrackerId)
    localStorage.setItem('firstModel_algorithm_names', this.firstModel_algorithm_names)
    this.displayFormByModelname()

  }



  /*******************************************************************************************
  ****************************** display model section********************************************** */
  displayFormByModelname() {
    console.log('this.firstModel_type', this.firstModel_type)

    //Non tranable model
    if (this.firstModel_type == 'TableExtractor') {
      this.display_tableExtractor = true
    }
    else if (this.firstModel_type == 'TextSummarization') {
      this.display_textSummarization = true
    }
    else if (this.firstModel_type == 'SentimentClassification') {
      this.display_sentimentClassification = true
    }
    else if (this.firstModel_type == 'VideoAnalytics') {
      this.display_VideoAnalytics = true
    }
    else if (this.firstModel_type == 'ObjectDetection') {
      this.display_ObjectDetection = true
    }
    else if (this.firstModel_type == 'QNA-KB') {
      this.display_QNA_KB = true
    }
    else if (this.firstModel_type == 'TicketClassification') {
      this.display_TicketClassification = true
    } 
    else if (this.firstModel_type == 'TermsExtraction') {
      this.display_TermsExtraction = true
    }
     else if (this.firstModel_type == 'TextExtraction') {
      this.display_TextExtraction = true
    } 
    else if (this.firstModel_type == 'InvoiceExtraction') {
      this.display_InvoiceExtraction = true
    }
     else if (this.firstModel_type == 'InstanceSegmentation') {
      this.display_InstanceSegmentation = true
    }
     else if (this.firstModel_type == 'DuplicatePrediction') {
      this.display_DuplicatePrediction = true
    }
     else if (this.firstModel_type == 'FaceRecognition') {
      this.display_FaceRecognotion = true
    }
     else if (this.firstModel_type == 'DocumentClassification') {
      this.display_DocumentClassification = true
    } 
    
    // tranable model
    else if (this.firstModel_type == 'TimeSeries') {
      this.display_TimeSeries = true
    }
     else if (this.firstModel_type == 'Classification') {
      this.display_Classification = true
    }
     else if (this.firstModel_type == 'AnamolyDetection') {
      this.display_AnamolyDetection = true
    }
     else if (this.firstModel_type == 'NER') {
      this.display_NER = true
    }
     else if (this.firstModel_type == 'VoiceClassification') {
      this.display_VoiceClassification = true
    } 
    else if (this.firstModel_type == 'SpeakerDiarization') {
      this.display_SpeakerDiarization = true
    }
     else if (this.firstModel_type == 'ProductCategorization') {
      this.display_ProductCategorization = true
    } 

  }


}
