---
title: "Send push notification to groups with OneSignal and Loopback"
published_at: "07 Oct 19"
slug: "send-push-notification-to-groups-with-onesignal-and-loopback-gni"
---

##The scenario

If you read the previous chapter you can jump straight to the next section, else let's consider this scenario.
We have an e-commerce mobile app that notifies the user if an out-of-stock item is available again.
This will be translated technically as follow.
We are going to make a function that will be executed when the item quantity is higher than zero, this function will notify the users about the update.
The difference is that this time we have many users that are waiting for the item to be available instead of a single one.

## The solution

The first thing that came to my mind is that we can get a list of users and make a loop that sends notifications one by one.
This solution was tested with an app of 5k users in prod, our first attempt was not even asynchronous and the server was down after reaching peak performance. The second time we did it asynchronously and the performance was so bad! the loopback server was busy sending notification and could not work on other requests. Of course like any amateur, we did update our server specs! in vain.
Those were some dark days...

## The real solution

after many tries that got us to read the documentation properly, we found many solutions the easiest one is to add the players' id in the
`include_player_ids` parameter of the notification.

First, our model has changed slightly and the parameter that stores the OneSignal ID is now an array.

```javascript
{
  "name": "Item",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "name": {
      "type": "string",
      "required": true
    },
    "quantity": {
      "type": "number",
      "required": true,
      "default": 0
    },
    "OneSignalUsersID": {
      "type": "array"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

Then if we change our previous code this will give us a function like this.

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
        include_player_ids: ctx.instance.oneSignalUsersID, // the oneSignalUsersID is now an array you have to check the new model definition
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

##Conciderations
In this example it was really simple the IDs were in a simple array, we get it without a problem. It won't be like that in real apps. Probably it will be a relation between the User and the Item model. with a one-to-many relation, you have to fetch the complete list, after applying filters maybe and then extract the id from the instances and put them inside an array. It's tedious and not optimal at all. certainly, it will consume resources that we need. Be careful if it's not as simple as an already prepared list.

##Optimisation
An optimization that came to my mind and that already exist in OneSignal SDK is segments and tags. These two methods will let you select a group of users from an already specified segment/tag.
This will be of course more optimal because we are not going to make any logic when we are sending the notification but we are going to apply the logic when we create the user or the item. Like this, we divide the workload so that we prepare the population before we contact them.
I will write about these two methods next time.

##Final word
Next time I will explain how to send a notification to a specific group using segments.

You can find the complete code in this repository, use your credentials though because what I put are fake:
https://github.com/Boussama/loopback-push-notification

Switch to the 'group-notification' branch:

```bash
git checkout single-notification # branch that contain all the groupe work
git checkout 852a1d5f542d187c0bb30860e28ba1d7dc1aed4 # this article work
```

If you have any question feel free to post a comment or a GitHub issue.
