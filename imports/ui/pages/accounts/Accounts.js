import { FlowRouter } from 'meteor/kadira:flow-router';

var myPostLogout = function(){
    //example redirect after logout
    FlowRouter.go('/');
};

var myPostSummit = function(){
    //example redirect after logout
    FlowRouter.go('/');
};

AccountsTemplates.configure({
  onLogoutHook: myPostLogout,
  onSubmitHook: myPostSummit,
  //validation
  continuousValidation: true,
  // Redirects
    homeRoutePath: '/',
    redirectTimeout: 0,

    texts: {
      button: {
          signUp: "Register",
          signIn: "Login"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      }
    }
});

AccountsTemplates.addFields([
  {
    _id : 'firstName',
    type : 'text',
    displayName : 'Username',
    required: true,
    minLength: 6,
    placeholder: "Username",
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: 'At least 1 lowercase and 1 uppercase letter required'
  }
]);
