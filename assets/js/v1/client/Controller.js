define(function(require) {

    var Marionette = require('marionette'),
        NavigationView = require('view/Navigation'),
        HomePageView = require('view/Homepage'),
        NotFoundView = require('view/NotFound'),
        ExploreView = require('view/Explore'),
        LoginFormView = require('view/LoginForm'),
        RegisterFormView = require('view/RegisterForm'),
        ForgotFormView = require('view/ForgotForm'),
        ViewPostView = require('view/ViewPost'),
        NewFormView = require('view/NewForm'),
        UserPageView = require('view/UserPage');

    return Marionette.Controller.extend({

        homePage: function() {
            var AppInstance = require('AppInstance'),
                homePageView = new HomePageView({});

            // update the main section
            AppInstance.regionMain.show(homePageView);
        }, 

        notFound: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new NotFoundView());
        },

        exploreMain: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new ExploreView());
            AppInstance.regionFooter.reset();
            //console.log(AppInstance.regionFooter);
        },

        exploreCat: function() {

        },

        loginForm: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new LoginFormView());
            AppInstance.regionFooter.reset();
        },

        registerForm: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new RegisterFormView());
            AppInstance.regionFooter.reset();
        },

        forgot: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new ForgotFormView());
            AppInstance.regionFooter.reset();
        },
        
        activeAccount: function(key) {},
        
        newFeedback: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new NewFormView());
            AppInstance.regionFooter.reset();
        },

        viewPost: function(alias) {
            var PostModel = require('model/PostModel');
            var AppInstance = require('AppInstance');
            
            var post = new PostModel();
            post.getByAlias(alias);

            
            AppInstance.regionMain.show(new ViewPostView({
                model: post
            }));
            AppInstance.regionFooter.reset();
        },
        
        userPage: function() {
            var UserModel = require('model/UserModel');
            var AppInstance = require('AppInstance');
            
            var user = new UserModel(window.__c.user || {});
            
            AppInstance.regionNav.show(new NavigationView());
            AppInstance.regionMain.show(new UserPageView({
                model: user
            }));
            AppInstance.regionFooter.reset();
        },
    });

});
