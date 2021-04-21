import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './case-study.routing';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllUseCaseComponent } from './all-use-case/all-use-case.component';
import { CreateDesignComponent } from './create-design/create-design.component';
import { CreateUseCaseComponent } from './create-use-case/create-use-case.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DesignWorkflowComponent } from './design-workflow/design-workflow.component';
import { ButtonModule } from 'primeng/button';
import { RunworkflowComponent } from './runworkflow/runworkflow.component';
import { ReloadIframeDirective } from './reload-iframe.directive';
import { DisplayWorkflowComponent } from './display-workflow/display-workflow.component';
import { TableExtractorComponent } from './models/table-extractor/table-extractor.component';
import { TextSummarizationComponent } from './models/text-summarization/text-summarization.component';
import { SentimentClassificationComponent } from './models/sentiment-classification/sentiment-classification.component';
import { VideoAnalyticsComponent } from './models/video-analytics/video-analytics.component';
import { ObjectDetectionComponent } from './models/object-detection/object-detection.component';
import { QNAKBComponent } from './models/qna-kb/qna-kb.component';
import { TicketClassificationComponent } from './models/ticket-classification/ticket-classification.component';
import { TermsExtractionComponent } from './models/terms-extraction/terms-extraction.component';
import { TextExtractionComponent } from './models/text-extraction/text-extraction.component';
import { InvoiceExtractionComponent } from './models/invoice-extraction/invoice-extraction.component';
import { InstanceSegmentationComponent } from './models/instance-segmentation/instance-segmentation.component';
import { DuplicatePredictionComponent } from './models/duplicate-prediction/duplicate-prediction.component';
import { FaceRecognotionComponent } from './models/face-recognotion/face-recognotion.component';
import { TimeSeriesComponent } from './models/time-series/time-series.component';
import { ClassificationComponent } from './models/classification/classification.component';
import { AnamolyDetectionComponent } from './models/anamoly-detection/anamoly-detection.component';
import { NERComponent } from './models/ner/ner.component';
import { VoiceClassificationComponent } from './models/voice-classification/voice-classification.component';
import { SpeakerDiarizationComponent } from './models/speaker-diarization/speaker-diarization.component';
import { ProductCategorizationComponent } from './models/product-categorization/product-categorization.component';
import { DocumentClassificationComponent } from './models/document-classification/document-classification.component';
import { ObjectValuesPipe } from './object-values.pipe';




@NgModule({
  declarations: [
    AllUseCaseComponent,
    CreateDesignComponent,
    CreateUseCaseComponent,
    DesignWorkflowComponent,
    RunworkflowComponent,
    ReloadIframeDirective,
    DisplayWorkflowComponent,
    TableExtractorComponent,
    TextSummarizationComponent,
    SentimentClassificationComponent,
    VideoAnalyticsComponent,
    ObjectDetectionComponent,
    QNAKBComponent,
    TicketClassificationComponent,
    TermsExtractionComponent,
    TextExtractionComponent,
    InvoiceExtractionComponent,
    InstanceSegmentationComponent,
    DuplicatePredictionComponent,
    FaceRecognotionComponent,
    TimeSeriesComponent,
    ClassificationComponent,
    AnamolyDetectionComponent,
    NERComponent,
    VoiceClassificationComponent,
    SpeakerDiarizationComponent,
    ProductCategorizationComponent,
    DocumentClassificationComponent,
    ObjectValuesPipe,

  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    NgbDropdownModule,
    ButtonModule, ReactiveFormsModule
  ]
})
export class CaseStudyModule { }
