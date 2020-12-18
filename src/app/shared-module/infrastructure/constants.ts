
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
    account: 'account'
  };

  static webApis = {
    login: environment.workbenchUrl + '/api/account/login',
    logout: environment.apiUrl + 'account/logout',
    getSharedData: environment.apiUrl + 'user/getUserData',
    getUserData: environment.apiUrl + 'user/getUserData',
    sendEmail: environment.apiUrl + 'user/sendEmail',
    resetPassword: environment.apiUrl + 'user/resetPassword',
    setPassword: environment.apiUrl + 'user/setPassword'
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
