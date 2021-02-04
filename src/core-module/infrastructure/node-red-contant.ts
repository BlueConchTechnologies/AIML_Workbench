
import { Constants } from './constants';

export class NodeRedConstants {
  static allSubflow =  localStorage.getItem("workflow");
  // static allSubflow = [{"id":"5750b22f.6cdecc","type":"tab","label":"document classification test 5","disabled":false,"info":""},{"id":"6d00b61d.6cd948","type":"subflow","name":"Document Classification","info":"","category":"","in":[],"out":[],"env":[],"color":"#DDAA99"},{"id":"bbcc4858.3393b8","type":"subflow","name":"File Upload","info":"","category":"","in":[],"out":[{"x":740,"y":120,"wires":[{"id":"eb60e72.20a4f18","port":0}]}],"env":[],"color":"#DDAA99"},{"id":"d62a90e7.d95cc","type":"http request","z":"6d00b61d.6cd948","name":"","method":"POST","ret":"obj","paytoqs":false,"url":"http://121.244.33.115:8080/api/DocumentClassification/predict_class","tls":"","persist":false,"proxy":"","authType":"","x":370,"y":60,"wires":[["a589ccbe.b103f"]]},{"id":"441ae066.0c097","type":"function","z":"6d00b61d.6cd948","name":"Set Text","func":"msg.headers = {\n    \"Content-Type\": \"multipart/form-data; boundary=------------------------d74496d66958873e\"\n}\n\nmsg.payload = '--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"select\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"print\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"text\"\\r\\n'+\n'Content-Type: text/html\\r\\n'+\n'\\r\\n'+\nmsg.payload+'\\r\\n'+\n'--------------------------d74496d66958873e--\\r\\n';\nreturn msg;","outputs":1,"noerr":0,"x":180,"y":60,"wires":[["d62a90e7.d95cc"]]},{"id":"bd3429fd.abca38","type":"http in","z":"6d00b61d.6cd948","name":"","url":"/documentClassification","method":"post","upload":false,"swaggerDoc":"","x":210,"y":240,"wires":[["b3ade76.6a2aa18"]]},{"id":"b3ade76.6a2aa18","type":"function","z":"6d00b61d.6cd948","name":"","func":"var text = msg.payload.text\nmsg.payload  = text;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":450,"y":200,"wires":[["441ae066.0c097"]]},{"id":"a589ccbe.b103f","type":"http response","z":"6d00b61d.6cd948","name":"","statusCode":"","headers":{},"x":570,"y":60,"wires":[]},{"id":"aa8b20cd.41667","type":"http in","z":"bbcc4858.3393b8","name":"UPLOAD","url":"/upload","method":"post","upload":true,"swaggerDoc":"","x":200,"y":120,"wires":[["9caa980b.5449c8","fa38873b.8a7b48"]]},{"id":"9caa980b.5449c8","type":"function","z":"bbcc4858.3393b8","name":"Set file name","func":"var extn = msg.req.files[0].originalname.split('.').pop()\nmsg.filename = \"test.\"+extn;\nmsg.extn= extn;\nmsg.payload = msg.req.files[0].buffer;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":390,"y":120,"wires":[["eb60e72.20a4f18","d8ea6a70.2b1c08"]]},{"id":"eb60e72.20a4f18","type":"file","z":"bbcc4858.3393b8","name":"Save file","filename":"","appendNewline":true,"createDir":true,"overwriteFile":"true","encoding":"none","x":600,"y":120,"wires":[[]]},{"id":"fa38873b.8a7b48","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":390,"y":280,"wires":[]},{"id":"d8ea6a70.2b1c08","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":true,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":650,"y":260,"wires":[]},{"id":"e555f82.0796308","type":"inject","z":"5750b22f.6cdecc","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":230,"y":80,"wires":[["67de3962.c905f8"]]},{"id":"d8937faf.8e5a7","type":"debug","z":"5750b22f.6cdecc","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":660,"y":260,"wires":[]},{"id":"67de3962.c905f8","type":"DocumentClassification","z":"5750b22f.6cdecc","name":"","x":500,"y":180,"wires":[["d8937faf.8e5a7"]]}]
  //static documentClassificationSubflow = [{ "id": "6d00b61d.6cd948", "type": "subflow", "name": "Document Classification", "info": "", "category": "", "in": [], "out": [], "env": [], "color": "#DDAA99" }, { "id": "d62a90e7.d95cc", "type": "http request", "z": "6d00b61d.6cd948", "name": "", "method": "POST", "ret": "obj", "paytoqs": false, "url": Constants.serviceUri.documentClassificationText, "tls": "", "persist": false, "proxy": "", "authType": "", "x": 370, "y": 60, "wires": [["a589ccbe.b103f"]] }, { "id": "441ae066.0c097", "type": "function", "z": "6d00b61d.6cd948", "name": "Set Text", "func": "msg.headers = {\n    \"Content-Type\": \"multipart/form-data; boundary=------------------------d74496d66958873e\"\n}\n\nmsg.payload = '--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"select\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"print\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"text\"\\r\\n'+\n'Content-Type: text/html\\r\\n'+\n'\\r\\n'+\nmsg.payload+'\\r\\n'+\n'--------------------------d74496d66958873e--\\r\\n';\nreturn msg;", "outputs": 1, "noerr": 0, "x": 180, "y": 60, "wires": [["d62a90e7.d95cc"]] }, { "id": "bd3429fd.abca38", "type": "http in", "z": "6d00b61d.6cd948", "name": "", "url": "/documentClassification", "method": "post", "upload": false, "swaggerDoc": "", "x": 210, "y": 240, "wires": [["b3ade76.6a2aa18"]] }, { "id": "b3ade76.6a2aa18", "type": "function", "z": "6d00b61d.6cd948", "name": "", "func": "var text = msg.payload.text\nmsg.payload  = text;\nreturn msg;", "outputs": 1, "noerr": 0, "initialize": "", "finalize": "", "x": 450, "y": 200, "wires": [["441ae066.0c097"]] }, { "id": "a589ccbe.b103f", "type": "http response", "z": "6d00b61d.6cd948", "name": "", "statusCode": "", "headers": {}, "x": 570, "y": 60, "wires": [] }]
  // static allSubflow = [{"id":"5750b22f.6cdecc","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"6d00b61d.6cd948","type":"subflow","name":"Document Classification","info":"","category":"","in":[],"out":[],"env":[],"color":"#DDAA99"},{"id":"bbcc4858.3393b8","type":"subflow","name":"File Upload","info":"","category":"","in":[],"out":[{"x":740,"y":120,"wires":[{"id":"eb60e72.20a4f18","port":0}]}],"env":[],"color":"#DDAA99"},{"id":"d62a90e7.d95cc","type":"http request","z":"6d00b61d.6cd948","name":"","method":"POST","ret":"obj","paytoqs":false,"url":"http://121.244.33.115:8080/api/DocumentClassification/predict_class","tls":"","persist":false,"proxy":"","authType":"","x":370,"y":60,"wires":[["a589ccbe.b103f"]]},{"id":"441ae066.0c097","type":"function","z":"6d00b61d.6cd948","name":"Set Text","func":"msg.headers = {\n    \"Content-Type\": \"multipart/form-data; boundary=------------------------d74496d66958873e\"\n}\n\nmsg.payload = '--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"select\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"print\"\\r\\n'+\n'\\r\\n'+\n'true\\r\\n'+\n'--------------------------d74496d66958873e\\r\\n'+\n'Content-Disposition: form-data; name=\"text\"\\r\\n'+\n'Content-Type: text/html\\r\\n'+\n'\\r\\n'+\nmsg.payload+'\\r\\n'+\n'--------------------------d74496d66958873e--\\r\\n';\nreturn msg;","outputs":1,"noerr":0,"x":180,"y":60,"wires":[["d62a90e7.d95cc"]]},{"id":"bd3429fd.abca38","type":"http in","z":"6d00b61d.6cd948","name":"","url":"/documentClassification","method":"post","upload":false,"swaggerDoc":"","x":210,"y":240,"wires":[["b3ade76.6a2aa18"]]},{"id":"b3ade76.6a2aa18","type":"function","z":"6d00b61d.6cd948","name":"","func":"var text = msg.payload.text\nmsg.payload  = text;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":450,"y":200,"wires":[["441ae066.0c097"]]},{"id":"a589ccbe.b103f","type":"http response","z":"6d00b61d.6cd948","name":"","statusCode":"","headers":{},"x":570,"y":60,"wires":[]},{"id":"aa8b20cd.41667","type":"http in","z":"bbcc4858.3393b8","name":"UPLOAD","url":"/upload","method":"post","upload":true,"swaggerDoc":"","x":200,"y":120,"wires":[["9caa980b.5449c8","fa38873b.8a7b48"]]},{"id":"9caa980b.5449c8","type":"function","z":"bbcc4858.3393b8","name":"Set file name","func":"var extn = msg.req.files[0].originalname.split('.').pop()\nmsg.filename = \"test.\"+extn;\nmsg.extn= extn;\nmsg.payload = msg.req.files[0].buffer;\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":390,"y":120,"wires":[["eb60e72.20a4f18","d8ea6a70.2b1c08"]]},{"id":"eb60e72.20a4f18","type":"file","z":"bbcc4858.3393b8","name":"Save file","filename":"","appendNewline":true,"createDir":true,"overwriteFile":"true","encoding":"none","x":600,"y":120,"wires":[[]]},{"id":"fa38873b.8a7b48","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":390,"y":280,"wires":[]},{"id":"d8ea6a70.2b1c08","type":"debug","z":"bbcc4858.3393b8","name":"","active":true,"tosidebar":true,"console":true,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":650,"y":260,"wires":[]}]
  static flowURL = {
    "DocumentClassification": "/documentClassification"
  }
}

