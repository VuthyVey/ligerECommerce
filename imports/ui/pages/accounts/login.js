import './login.html';
import { FlowRouter } from 'meteor/kadira:flow-router';

// override templates to meet themes standard
// package: aldeed:template-extension
Template['override-atTextInput'].replaces('atTextInput'); // atTextInput is default template in account:unstyle
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn'); // check for all defaults templates at: https://github.com/meteor-useraccounts/unstyled/tree/master/lib
