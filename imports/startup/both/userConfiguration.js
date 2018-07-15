import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Roles } from 'meteor/alanning:roles';

var myPostLogout = function() {
  //redirect after logout
  FlowRouter.go('/');
};

var myPostSummit = function(error, state) { // state = signUp or signIn

 //redirect after submit
  if (!error) { // no error from login or sign in
    if (Session.get('redirectPath')) { // redirectPath is previous link user try to load, but the system bring them to login
      var path = Session.get('redirectPath');
      Session.set('redirectPath', ''); //  clear
      FlowRouter.go(path); // go back
    } else {
      FlowRouter.go('/');  // Session none? back to home.
    }
  }


};

var myPostSignUp = function (userId, info) {
  console.log(userId)
  // add a role to new user
  Roles.addUsersToRoles(userId, ['normal-user']);

}

// override account configuration over useracccount package
AccountsTemplates.configure({
  onLogoutHook: myPostLogout,
  onSubmitHook: myPostSummit,
  postSignUpHook: myPostSignUp,
  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 0,
  //ui
  texts: {
    button: {
      signUp: "Register",
      signIn: "Login"
    }
  }
});


AccountsTemplates.addFields([{
  _id: 'userName', // a new input box at the signup page
  type: 'text',
  displayName: 'Username',
  required: true,
  minLength: 6,
  placeholder: "Username",
  re: /(?=.*[a-z])(?=.*[A-Z])/,
  errStr: 'At least 1 lowercase and 1 uppercase letter required'
}]);
