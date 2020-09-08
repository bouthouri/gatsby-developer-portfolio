---
title: "Send push notification to single users with OneSignal and  Loopback"
published_at: "30 Sep 19"
slug: "send-a-notification-to-a-single-user-in-loopback-with-onesignal-1i6b"
---

##The scenario
To better illustrate this probleme let's consider this scenario.
We have an e-commerce mobile app that let the user be notified if an out-of-stock item is again available.
This will be translated technically as follow.
We are going to make a function that will be executed when the item quantity is higher than zero, this function will notify the user about the update.

##The OneSignal User ID
We are assuming that the User model already contains the OneSignalUserID.
This scenario is very popular with mobile apps, and they add the OneSignal user ID when signing up.
I did not see any example like this in a web client, but if you are curious how to do it, this is a hint.

```javascript
OneSignal.push(function() {
    OneSignal.showNativePrompt().then(function(val) {
        OneSignal.getUserId().then(function(userId) {
        if (userId == null) {
            console.log("there's an error");
        } else {
            // you have the OneSignal user ID do what you want with it
        }
        });
    });
}
```

##Listening to change
In loopback we can use hooks to trigger actions after or before a remote method is called using the API.
In our scenario, we have to listen to the change in the item quantity. This change is done by patching the quantity attribute inside the Item model. After every patch on the Item model we check if this change affects the quantity or not if it's the case we send our notification.

> I am using beforeRemote so I can make a comparison between the item instance and the change that happens, which we can't do in the afterRemote.

Inside `common/models/item.js` put this

```javascript
var OneSignal = require("onesignal-node")

module.exports = function(Item) {
  Item.beforeRemote("prototype.patchAttributes", function(ctx, unused, next) {
    if (
      ctx.instance.oneSignalUserID && // we check if the item contain OneSignal user that wait for a change
      ctx.instance.quantity === 0 && // if the quantity is zero
      ctx.args.data.quantity > 0 // and we are going to increase it
    ) {
      // then we send our notification to the user
    }
    next()
  })
}
```

In Loopback we use the keyword prototype if the function is attached to an instance and not the model itself, like a static function.
We can get the item instance data from the context using `ctx.instance`
and we can get arguments data from `ctx.args.data`

##Sending the notification
In order to make things simple, I assumed that every item has an attribute that contains a OneSignal user ID and not many users, but the logic is the same.

```javascript
var OneSignal = require("onesignal-node")

module.exports = function(Item) {
  Item.beforeRemote("prototype.patchAttributes", function(ctx, unused, next) {
    if (
      ctx.instance.oneSignalUserID &&
      ctx.instance.quantity === 0 &&
      ctx.args.data.quantity > 0
    ) {
      // instantiate the OneSignal app client
      var myClient = new OneSignal.Client({
        userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
        app: {
          appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhxdN2EwOTE3NjJm", // REST API Key
          appId: "fd568c3d-4d40-405f-9214-b5aaf470fac8", // OneSignal App ID
        },
      })

      // we put the item inside an object
      const instance = {
        ...((ctx && ctx.instance && ctx.instance.toJSON()) || {}),
      }

      // create the notification
      var firstNotification = new OneSignal.Notification({
        contents: { en: "The item is available again" },
        data: instance, // we can send the item data so the user know what exactly is available again
        include_player_ids: [ctx.instance.oneSignalUserID], // we put the user OneSignal id here
      })

      //send
      myClient.sendNotification(firstNotification, function(
        err,
        httpResponse,
        data
      ) {
        if (err) {
          console.log("Something went wrong...")
        } else {
          console.log(data, httpResponse.statusCode)
        }
      })
    }
    next()
  })
}
```

##Final word
Next time I will explain how to send a notification to a specific group of users.

You can find the complete code in this repository, use your credentials though because what I put are fake:
https://github.com/Boussama/loopback-push-notification

Switch to the 'single-notification' branch:  
`git checkout single-notification`

If you have any question feel free to post a comment or a GitHub issue.
