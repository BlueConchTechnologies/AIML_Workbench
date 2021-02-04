module.exports = function(RED) {
    function functionAnamolyDetection(config) {
        RED.nodes.createNode(this,config);
       // function code
    }
    RED.nodes.registerType('AnamolyDetection',functionAnamolyDetection); 
     
    function functionTimeSeries(config) {
        RED.nodes.createNode(this,config);
       // function code
    }
    RED.nodes.registerType('TimeSeries',functionTimeSeries); 

    function functionClassification(config) {
        RED.nodes.createNode(this,config);
       // function code
    }
    RED.nodes.registerType('Classification',functionClassification);
    
    function functionDocumentClassification(config) {
        RED.nodes.createNode(this,config);
  
        const request = require('request');
        var data = {
        trainingTracker_id: '5f8d919a81b551558f8c2e92',
        text: "Addendum No.1 To Master Services Agreement  This Addendum Number",
        };
        this.on('input',function (msg){
           
        request.post({url:'http://121.244.33.115:5672/api/predict', formData: data}, function(err, httpResponse, body) { 
                    console.log('Upload successful!  Server responded with:', body); 
    
        });
    })

    }
    RED.nodes.registerType('DocumentClassification',functionDocumentClassification);

    function functionTextExtraction(config) {
        RED.nodes.createNode(this,config);
       // function code
    }
    RED.nodes.registerType('TextExtraction',functionTextExtraction);
}