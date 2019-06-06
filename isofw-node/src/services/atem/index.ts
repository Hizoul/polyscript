import * as ATEM from "atem"

console.log("About to connect to ATEM")
var atem = new ATEM('192.168.10.240');
atem.connect();
atem.on('connect', function() {
    console.log('atem connected');
});


atem.on('inputTally', function(sourceID: any, state: any) {
    // console.log("atem source", sourceID, state)
    // if sourceID program or preview in state = true then dont change preview via cameraApi
});