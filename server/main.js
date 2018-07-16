// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

// in server/publish.js
Meteor.publish('roles', function (){ // In other to use Meteor role package need to subscribe this
  return Meteor.roles.find({})
})
