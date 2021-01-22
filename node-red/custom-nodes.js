   module.exports = function(RED) {

        function functionAnamolyDetection(config) {
            RED.nodes.createNode(this,config);
           // function code
        }
        RED.nodes.registerType('AnamolyDetection',functionAnamolyDetection);  

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
                       
                                                    //    var outmsg = {payload :body};
                                                    //     this.send(outmsg);
                                                             
                    
            });
        })

        //     const axios = require('axios');
        //     const FormData = require('form-data');
        //     let formData = new FormData();
        //     const request = require('request');

        //     formData.append("trainingTracker_id", "5f8d919a81b551558f8c2e92");
        //     formData.append("text" , "Addendum No.1 To Master Services Agreement  This Addendum Number 1");
        //     var apiUrl = 'http://121.244.33.115:5672/api/predict';
        //     axios.post(apiUrl, formData)
        //     .then(function (response) {
        //         this.on('input',function (msg){
        //                            var outmsg = {payload :response.data};
        //                             this.send(outmsg);
        //                         })
        //     }).catch(error => {
        //             this.on('input',function (msg){
        //                 var outmsg = {payload :error.response};
        //                  this.send(outmsg);
        //              })
        //   });
      }
       RED.nodes.registerType('DocumentClassification',functionDocumentClassification);
   
    
        
}


