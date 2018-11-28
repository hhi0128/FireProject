package com.rnc.fire;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    private String msg;
    private static String room;
    private static String human;

    public MyFirebaseMessagingService(){

    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage){
        String from = remoteMessage.getFrom();
        Map<String, String > data = remoteMessage.getData();

        msg = data.get("msg");
        room = data.get("room");
        human = data.get("human");

        Log.d("serverSend: ", msg);
        Log.d("serverSend: ", "room - " + room);
        Log.d("serverSend: ", "human - " + human);

        NotificationManager manager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        NotificationCompat.Builder builder = null;

        builder = new NotificationCompat.Builder(this);
        builder.setSmallIcon(android.R.drawable.ic_notification_overlay);
        builder.setContentTitle("긴급");
        builder.setWhen(System.currentTimeMillis());
        builder.setContentText("this is message");
        builder.setAutoCancel(true);

        manager.notify(222, builder.build());
    }
}
