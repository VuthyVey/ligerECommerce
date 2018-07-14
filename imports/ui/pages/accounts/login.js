import './login.html';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template['override-atTextInput'].replaces('atTextInput');
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');

Template.App_login.events({
  'click #testing'  () {
    FlowRouter.go('/')
  }
});
