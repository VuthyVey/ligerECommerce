// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
// in server/publish.js
Meteor.publish(null, function (){
  return Meteor.roles.find({})
})
