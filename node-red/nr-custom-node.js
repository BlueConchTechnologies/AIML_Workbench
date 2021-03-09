module.exports = function(RED) {
    
    //model 1 //done
    function functionTermsExtraction(config) {
        RED.nodes.createNode(this,config);
        
    }
    RED.nodes.registerType('TermsExtraction',functionTermsExtraction); 

    //model 2 (trainable)
    function functionVoiceClassification(config) {
        RED.nodes.createNode(this,config);
        
    }
    RED.nodes.registerType('VoiceClassification',functionVoiceClassification); 

    //model 3 (trainable)
    function functionSpeakerDiarization(config) {
        RED.nodes.createNode(this,config);
        
    }
    RED.nodes.registerType('SpeakerDiarization',functionSpeakerDiarization); 

    //model 4   // done
    function functionTextExtraction(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('TextExtraction',functionTextExtraction);

    //model 5   // done
    function functionInvoiceExtraction(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('InvoiceExtraction',functionInvoiceExtraction);

     //model 6 // done
     function functionInstanceSegmentation(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('InstanceSegmentation',functionInstanceSegmentation);

      //model 7
      function functionVideoAnalytics(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('VideoAnalytics',functionVideoAnalytics);

     //model 8
     function functionObjectDetection(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('ObjectDetection',functionObjectDetection);

    //model 9   // done
    function functionTableExtractor(config) {
        RED.nodes.createNode(this,config);
        
    }
    RED.nodes.registerType('TableExtractor',functionTableExtractor); 

     // //model 10 (trainable)   
     function functionClassification(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('Classification',functionClassification);

     // //model 11 (trainable)
     function functionAnamolyDetection(config) {
        RED.nodes.createNode(this,config);

    }
     RED.nodes.registerType('AnamolyDetection',functionAnamolyDetection);

     // //model 12   // done
     function functionDocumentClassification(config) {
        RED.nodes.createNode(this,config);
      
    }
    RED.nodes.registerType('DocumentClassification',functionDocumentClassification); 

    //model 13 (trainable)
    function functionTimeSeries(config) {
        RED.nodes.createNode(this,config);

    }
    RED.nodes.registerType('TimeSeries',functionTimeSeries);

   //model 14  // done
    function functionTextSummarization(config) {
        RED.nodes.createNode(this,config);
      
    }
    RED.nodes.registerType('TextSummarization',functionTextSummarization); 

     //model 15   // done
     function functionSentimentClassification(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('SentimentClassification',functionSentimentClassification);

    //model 16   
    function functionQNA_KB(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('QNA-KB',functionQNA_KB);

    //model 17
    function functionTicketClassification(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('TicketClassification',functionTicketClassification);

    //model 18
    function functionNER(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('NER',functionNER);

    //model 19
    function functionDuplicatePrediction(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('DuplicatePrediction',functionDuplicatePrediction);

    //model 20
    function functionFaceRecognition(config) {
        RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType('FaceRecognition',functionFaceRecognition);



   

    
    
      // //model 11 (trainable)
    //   function functionAnamolyDetection(config) {
    //     RED.nodes.createNode(this,config);
  
    //     const request = require('request');
    //     var data = {
    //     trainingTracker_id: '5f8d919a81b551558f8c2e92',
    //     text: "Addendum No.1 To Master Services Agreement  This Addendum Number",
    //     };
    //     this.on('input',function (msg){
           
    //     request.post({url:'http://121.244.33.115:5672/api/predict', formData: data}, function(err, httpResponse, body) { 
    //                 console.log('Upload successful!  Server responded with:', body); 
    
    //     });
    // })

    // }
    //  RED.nodes.registerType('AnamolyDetection',functionAnamolyDetection);
    
    // //model 5
    // function functionAnamolyDetection(config) {
    //     RED.nodes.createNode(this,config);
  
    //     const request = require('request');
    //     var data = {
    //     trainingTracker_id: '5f8d919a81b551558f8c2e92',
    //     text: "Addendum No.1 To Master Services Agreement  This Addendum Number",
    //     };
    //     this.on('input',function (msg){
           
    //     request.post({url:'http://121.244.33.115:5672/api/predict', formData: data}, function(err, httpResponse, body) { 
    //                 console.log('Upload successful!  Server responded with:', body); 
    
    //     });
    // })

    // }
    //  RED.nodes.registerType('AnamolyDetection',functionAnamolyDetection);
   
}