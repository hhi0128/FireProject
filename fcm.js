var FCM = require('fcm-push');

//fcm console에서 획득하는 서버키
var serverKey="AIzaSyCg0KPkjGZzWUhLYKX-Wu0KrVdTEkPjqok";
var appToken="cTkvMfgRdTg:APA91bHVcAZ0EpfqHWgm78hVmwbo1v7xOGqR8TI9J_q3fA8yIxPE6y6cbA5wYaauwfS70zdAdQQAYcawbZ3bPqhLrgnE8tC6C6Qv6gQbi14oMsPhyf2NCmxigeUdyQbHuXVNlgTYAptF";

var push_data = {
    to: appToken,

    notification: {
        title: "긴급",
        body: "A방에서 화재 발생!!",
        sound: "default",
        click_Action: "MAIN_ACTIVITY",
        icon: "fcm_push_icon"
    },

    priority: "high",

    restricted_package_name: "com.rnc.fire",
    
    data:{
        msg: 'A방에서 화재 발생!!',
        room: 'A',
        human: 'B'
    }
}

var fcm = new FCM(serverKey);

fcm.send(push_data, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
    console.log("Successfully sent with response: ", response);
    }
});

