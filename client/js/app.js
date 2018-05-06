// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app', [
      'ui.router',
      'lbServices',
      'chart.js'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
                                                              $urlRouterProvider) {
      $stateProvider
          .state('all-products', {
            url: '/all-products',
            templateUrl: 'views/all-reviews.html',
            controller: 'AllReviewsController'
          })
      ;
      $urlRouterProvider.otherwise('all-products');
    }])
    .run(['$rootScope', '$state', 'LoopBackAuth', function($rootScope, $state, LoopBackAuth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        // redirect to login page if not logged in
        if (toState.authenticate && !LoopBackAuth.accessTokenId) {
          event.preventDefault(); //prevent current page from loading

          // Maintain returnTo state in $rootScope that is used
          // by authService.login to redirect to after successful login.
          // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
          $rootScope.returnTo = {
            state: toState,
            params: toParams
          };

          $state.go('forbidden');
        }
      });

      // Get data from localstorage after pagerefresh
      // and load user data into rootscope.
      if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
        //AuthService.refresh(LoopBackAuth.accessTokenId);
      }
    }]);
