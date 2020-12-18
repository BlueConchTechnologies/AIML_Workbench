
export class Constants {

  static noOfLastLogsSendToServer = 100;

  static cookies = {
    sessionId: 'SessionId'
  };

  static requestHeader = {
    authorization: 'Authorization',
    sessionId: 'SessionId',
    bearer: 'Bearer',
    accept: 'Accept',
    contentType: 'Content-Type'
  };

  static apiToken = {
    refreshToken: 'grant_type=refresh_token&client_id=web&refresh_token='
  };

  static contentType = {
    json: 'application/json',
    formUrlEncoded: 'application/x-www-form-urlencoded',
    multiPart: 'multipart/form-data'
  };

  static queryString = {
    SessionExpired: 'SessionExpired=true',
    SessionKilled: 'SessionKilled=true',
    me: '?me'
  };

  static localStorageKeys = {
    apiToken: 'apiToken',
    isLoggedIn: 'isLoggedIn',
    sessionId: 'sessionId'
  };
  static serviceUri = {
    documentClassificationText: 'http://121.244.33.115:8080/api/DocumentClassification/predict_class',
    termExtraction: 'http://172.30.24.118:8092/termExtractor',
    tableExtractor: 'http://172.30.24.118:8093/extractTable'
  };

}
