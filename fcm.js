var FCM = require('fcm-push');
const firebase = require('firebase');

//fcm console에서 획득하는 서버키
var serverKey="AIzaSyCg0KPkjGZzWUhLYKX-Wu0KrVdTEkPjqok";
var appToken="cTkvMfgRdTg:APA91bHVcAZ0EpfqHWgm78hVmwbo1v7xOGqR8TI9J_q3fA8yIxPE6y6cbA5wYaauwfS70zdAdQQAYcawbZ3bPqhLrgnE8tC6C6Qv6gQbi14oMsPhyf2NCmxigeUdyQbHuXVNlgTYAptF";


var config = {
    "apiKey": "AIzaSyCVUj0C4mlN0Kv7vWeRRg4Jy55f4t5GEZQ",
    "authDomain": "raspberry-bfea0.firebaseapp.com",
    "databaseURL": "https://raspberry-bfea0.firebaseio.com",
    "projectId": "raspberry-bfea0",
    "storageBucket": "raspberry-bfea0.appspot.com",
    "messagingSenderId": "312742933333"
};
var app = firebase.initializeApp(config);

var database = firebase.database();
var starCountRef = firebase.database().ref("sensor");
starCountRef.on("value", function(snapshot) {
  console.log(snapshot.val());
  onChange(snapshot.val());
});

function onChange(val){

    var fireRoom;
    let fireHuman = "none";

    if(val.fireA == 1) room = "A";
    else if(val.fireB == 1) room = "B";
    else if(val.fireC == 1) room = "C";
    else if(val.fireD == 1) room = "D";
    else if(val.fireE == 1) room = "E";
    else room = "none";

    if(val.HumanA == 1) fireHuman = fireHuman + "A ";
    if(val.HumanB == 1) fireHuman = fireHuman + "B ";
    if(val.HumanC == 1) fireHuman = fireHuman + "C ";
    if(val.HumanD == 1) fireHuman = fireHuman + "D ";
    if(val.HumanE == 1) fireHuman = fireHuman + "E ";
    

    var push_data = {
        to: appToken,
    
        notification: {
            title: "긴급",
            body: room + "방에서 화재 발생!!",
            sound: "default",
            click_Action: "MAIN_ACTIVITY",
            icon: "fcm_push_icon"
        },
    
        priority: "high",
    
        restricted_package_name: "com.rnc.fire",
        
        data:{
            msg: 'A방에서 화재 발생!!',
            room: fireRoom, 
            human: fireHuman
        }
    }
    
    var fcm = new FCM(serverKey);
    if (fireRoom != "none"){
        fcm.send(push_data, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
            console.log("Successfully sent with response: ", response);
            }
        });
    }
}
