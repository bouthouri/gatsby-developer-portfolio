---
title: "Send push notification group using tags with OneSignal and Loopback"
published_at: "07 Oct 19"
slug: "send-push-notification-group-using-tags-with-onesignal-and-loopback-3imh"
---

##The scenario

We have an e-commerce mobile app that notifies the user if a bio item is added to the store.
This will be translated technically as follow.
We are going to make a function that will be executed when the item is created, this function will notify the bio enthusiast users about the availability of a new item.
We should make the appropriate change to the User and Item models.

##Preparing the Client model

In Loopback we can't make a change directly to the User model.
If we want to make a custom function, hooks or attribute we have to create a new Model based on the User model.

```bash
Oussama-MBP-3:loopback-push-notification oussama\$ lb model
? Enter the model name: Client
? Select the datasource to attach Client to: db (memory)
? Select model's base class (custom)
? Enter the base model name: User
? Expose Client via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? common
Let's add some Client properties now.

Enter an empty property name when done.
? Enter the property name: bioFoodEnthusiast
? Property type: boolean
? Required? No
? Default value[leave blank for none]: false

Let's add another Client property.
Enter an empty property name when done.
? Enter the property name: oneSignalUserID
? Property type: string
? Required? No
? Default value[leave blank for none]:
```

Now we need a custom function executed at the creation of every new user.
When this function is executed we will check if the user is bio enthusiast so we can make appropriate decisions.

Inside `common/client.js` put this code:

```javascript
var OneSignal = require("onesignal-node")

module.exports = function(Client) {
  Client.afterRemote("create", function(ctx, modelInstance, next) {
    if (modelInstance.oneSignalUserID && modelInstance.bioFoodEnthusiast) {
      // instantiate the OneSignal app client
      var myClient = new OneSignal.Client({
        userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
        app: {
          appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
          appId: "fd568c3d-4d40-405f-9214-b5acf470fac8", // OneSignal App ID
        },
      })

      // create a device object and specify what tag it has
      var deviceBody = {
        tags: {
          bioFoodEnthusiast: modelInstance.bioFoodEnthusiast, //name of the tag and the value
        },
      }

      // edit the current user device with what we created
      myClient.editDevice(modelInstance.oneSignalUserID, deviceBody, function(
        err,
        httpResponse,
        data
      ) {
        if (err) next(err)
        next()
      })
    } else {
      next()
    }
  })
}
```

Now, whenever you create a new bio food, enthusiast client it will update his tag in OneSignal automatically.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/8gmnntdehoimbcccamkv.png)

The difference will be available on your OneSignal dashboard.
App > Audience > All Users

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/imm425d5ka9021n8z9xa.png)

##Prepare the Item model

We already have the Item model so we are not going to use the CLI, instead, we are doing it manually.
Edit the `common/item.json` file to add the bio attribute:

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
    },
    "bio": {
      "type": "boolean",
      "required": false,
      "default": false
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

##Send the notification

We already know what is there to know.
We hook to the create remote and we send a new notification for every new item that is bio.

Add this function to `common/models/item.js`:

```javascript
Item.afterRemote("create", function(ctx, modelInstance, next) {
  if (modelInstance.bio) {
    // the product is bio so we should notify the users
    // instantiate the OneSignal app client
    var myClient = new OneSignal.Client({
      userAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
      app: {
        appAuthKey: "OGE0MzUyNjAtMjM4Ny00NjNhLTk5NjctMDhmN2EwOTE3NjJm", // REST API Key
        appId: "fd568c3d-4d40-405f-9214-b5acf470fac8", // OneSignal App ID
      },
    })

    // create the notification
    var availabilityNotification = new OneSignal.Notification({
      contents: { en: "There's a new bio item" },
    })

    // set the filter to the correspandant tag
    availabilityNotification.setFilters([
      { field: "tag", key: "bioFoodEnthusiast", value: true },
    ])

    //send notification
    myClient.sendNotification(availabilityNotification, function(
      err,
      httpResponse,
      data
    ) {
      if (err) next(err) //if there's an error we return the error as response
      next() // else we return the response
    })
  } else {
    next()
  }
})
```

And that's it, now we have our final result in the most optimized way.

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/kc8lmxfjzjc0csmt6rka.png)

> When selecting the tags to apply there's not just the value that you can put but you can use relation. For example, if you used numbers you can select the 'higher' relation.
> `{"field": "tag", "key": "age","relation": ">", "value": 18}`

##Final words

Finally, I can say that this solution is a good solution without any problem. When we are going to send notification we just send notification without doing any logic work. and the logic work will be divided into many operations that it won't affect our performances.

You can find the complete code in this repository, use your credentials though because what I put are fake:
https://github.com/Boussama/loopback-push-notification

Switch to the 'group-notification' branch:

```bash
git checkout tags-notification
```

If you have any question feel free to post a comment or a GitHub issue.
