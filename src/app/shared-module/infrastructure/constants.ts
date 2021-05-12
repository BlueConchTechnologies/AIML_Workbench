
import { ConfigurationSettings } from './configuration-settings';
import { environment } from '../../../environments/environment';

export class Constants {

  static regExType = {
    numeric: /^\d+$/,
    alphanumeric: /^[a-zA-Z0-9]*$/,
    alphanumericWithSpace: /^[a-zA-Z0-9 ]*$/,
    alphanumWithSpecial1: /^[a-zA-Z0-9!''#$%&( )*+,./:;=?@^_-]*$/,
    decimalPrecisionFour: /^([0-9]*([.]{1}[0-9]{0,4})?)$/,
    decimalPrecisionTwo: /^([0-9]*([.]{1}[0-9]{0,2})?)$/,
    negativedecimalPrecisionFour: /^(-?[0-9]*([.]{1}[0-9]{0,4})?)$/,

    alph1anum1: '^.*(?=.{7,})(?=.*[0-9])(?=.*[a-zA-Z]).*$',
    phoneKey: /^[a-zA-Z0-9( )-]*$/,
    email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  };

  static cookies =
    {
      sessionId: 'SessionId'
    };

  static requestHeader =
    {
      authorization: 'Authorization',
      sessionId: 'SessionId',
      bearer: 'Bearer',
      accept: 'Accept',
      contentType: 'Content-Type'
    };

  static apiToken = {
    refreshToken: 'grant_type=refresh_token&client_id=web&refresh_token='
  };

  static contentType =
    {
      json: 'application/json; charset=utf-8',
      formUrlEncoded: 'application/x-www-form-urlencoded',
      multiPart: 'multipart/form-data'
    };

  static uiRoutes = {
    empty: '',
    home: 'home',
    marketplace: 'marketplace',
    casestudy: 'casestudy',
    createdesign: 'create-design',
    designWorkflow: 'design-workflow',
    createusecase: 'create-usecase',
    default: ConfigurationSettings.defaultRoutePrefix,
    adminhome: 'adminhome',
    login: 'login',
    signup:'signup',
    resetpassword: 'resetpassword',
    product: 'product',
    order: 'order',
    offer: 'offer',
    statemanagement: 'state-management',
    forgotpassword: 'forgotpassword',
    sendemail: 'sendemail',
    reactiveForm: 'reactiveForm',
    modal: 'modal',
    spinnerdemo: 'spinnerdemo',
    toastrdemo: 'toastrdemo',
    unauthorize: 'unauthorize',
    invoice: 'invoice',
    modellist: 'model-list',
    account: 'account',
    profile: 'profile',
    runworkflow: 'runworkflow',
    displayWorkflow: 'displayWorkflow',
    TableExtractorComponent: 'tableExtractorComponent',
    TextSummarizationComponent :'textSummarizationComponent ',
    runModels: 'run-models',
    SentimentClassificationComponent:'sentimentClassificationComponent',
    VideoAnalyticsComponent:'VideoAnalyticsComponent',
    ObjectDetectionComponent:'ObjectDetectionComponent',
    QNAKBComponent:'QNAKBComponent',
    TicketClassificationComponent:'TicketClassificationComponent',
    TermsExtractionComponent:'TermsExtractionComponent',
    TextExtractionComponent:'TextExtractionComponent',
    InvoiceExtractionComponent:'InvoiceExtractionComponent',
    InstanceSegmentationComponent:'InstanceSegmentationComponent',
    DuplicatePredictionComponent:'DuplicatePredictionComponent',
    FaceRecognotionComponent:'FaceRecognotionComponent',
    TimeSeriesComponent:'TimeSeriesComponent',
    ClassificationComponent:"ClassificationComponent",
    AnamolyDetectionComponent:'AnamolyDetectionComponent',
    NERComponent:'NERComponent',
    VoiceClassificationComponent:'VoiceClassificationComponent',
    SpeakerDiarizationComponent:'SpeakerDiarizationComponent',
    ProductCategorizationComponent:'ProductCategorizationComponent',
    DocumentClassificationComponent:'DocumentClassificationComponent',
  };

  static webApis = {
    login: environment.apiUrl + 'login',
    register: environment.apiUrl + 'register',
    logout: environment.apiUrl + 'account/logout',
    update:environment.apiUrl+'update/',
    change_password:environment.apiUrl+'change_password/',
    getSharedData: environment.apiUrl + 'account/getUserData',
    // getUserData: environment.apiUrl + 'account/getUserData',
    sendEmail: environment.apiUrl + 'account/sendEmail',
    resetPassword: environment.apiUrl + 'account/resetPassword',
    setPassword: environment.apiUrl + 'account/setPassword'
  };

  static businessExceptions = {
    SessionExpired: 'SessionExpired',
    SessionKilled: 'SessionKilled',
    ErrorCode: 'ErrorCode',
    MessageCode: 'MessageCode'
  };

  static queryString = {
    SessionExpired: 'SessionExpired=true',
    SessionKilled: 'SessionKilled=true'
  };

  static localStorageKeys = {
    userName: 'userName',
    apiToken: 'apiToken',
    isLoggedIn: 'isLoggedIn',
    sessionId: 'sessionId'
  };

  static imageExtension =
    {
      jpeg: '.jpeg',
      jpg: '.jpg'
    };

  static headerConstant =
    {
      xpLogo: 'xpTopRightLogo.png',
    };

  static splitChars = {
    comma: ','
  };

  static reusableComponentURL = {
    reactiveformJsonURL: '/assets/Infrastructure/reactiveform-data/reactive-form-data.json'
  };

  static accountfields = {
    username: 'Username',
    password: 'Password',
    accesskey: 'Accesskey',
    secretkey: 'Secretkey',
    miniohost: 'Miniohost',
    bucketname: 'Bucketname',
    minioport: 'Minioport',
    trainingserver: 'Training server',
    storageserver: 'Storage server',
    databaseserver: 'Database server',
    savecredentials: 'Save Credentials',
    testconnection: 'Test Connection'
  };
}
