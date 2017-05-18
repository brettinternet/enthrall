angular.module('enthrall').controller('mainController', function($scope, $timeout, $showdown, userService, chatService, $stateParams) {


  // ng-slick-carousel
  $scope.currentIndex = 0;
  $scope.slickConfig = {
    enabled: true,
    autoplay: false,
    draggable: true,
    infinite: false,
    method: {},
    event: {
      afterChange: function (event, slick, currentSlide, nextSlide) {
        $scope.currentIndex = currentSlide;
        getCurrentSlide();
      },
      init: function (event, slick, currentSlide, nextSlide) {
        slick.slickGoTo($scope.currentIndex);
      }
    }
  };

  // present carousel
  $scope.slickConfigPresent = {
    enabled: true,
    autoplay: false,
    draggable: true,
    infinite: true,
    method: {},
    event: {
      afterChange: function (event, slick, currentSlide, nextSlide) {
        $scope.currentIndex = currentSlide;
        getCurrentSlide();
      },
      init: function (event, slick, currentSlide, nextSlide) {
        slick.slickGoTo($scope.currentIndex);
      }
    }
  };

  $scope.slidePresentLoaded = false;
  //kickstart the slick slides after promise
  var jumpStartSlides = function() {
    $scope.slidePresentLoaded = false;
    $timeout(function () {
      $scope.slidePresentLoaded = true;
    }, 5);
  }



  // editing slides
  $scope.editSlides = [];
  var getCurrentSlide = function() {
    if ($scope.editSlides.length === 0) {
      $scope.slideNumber = 0;
    } else {
      $scope.slideNumber = $scope.currentIndex + 1;
    }
  }
  getCurrentSlide();

  // console.log($scope.editSlides);
  $scope.slideEditLoaded = true;

  // add slide
  $scope.addEditSlide = function() {
    $scope.slideEditLoaded = false;
    $scope.editSlides.splice($scope.currentIndex+1,0,{slide: true})
    $timeout(function () {
      getCurrentSlide();
      $scope.slideEditLoaded = true;
    }, 5);
  }
  // delete slide
  $scope.deleteEditSlide = function() {
    $scope.slideEditLoaded = false;
    $scope.editSlides.splice($scope.currentIndex,1)
    $timeout(function () {
      getCurrentSlide();
      $scope.slideEditLoaded = true;
    }, 5);
  }


  // TODO: showdown github flavoring/styles, especially for code tags
  var github = {
    omitExtraWLInCodeBlocks: true,
    prefixHeaderId: 'user-content-',
    simplifiedAutoLink: true,
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tablesHeaderId: true,
    ghCodeBlocks: true,
    tasklists: true
  };

  for (var key in github) {
      $showdown.setOption(key, github[key]);
  };
  showdown.setFlavor('github');

  // TODO: use regex to filter out id=""
  // $scope.slideData = {};
  $scope.showHtmlCode = function() {
    $scope.slideOutput = $showdown.makeHtml($scope.editSlides[$scope.currentIndex].slideInput);
  }

  // TODO: save slide textarea inputs to local storage


  // defaults
  $scope.firebaseUser = null;
  $scope.tutorStatus = false;
  $scope.presName = $stateParams.presTitle;
  $scope.presIdentifier = $stateParams.urlId;
  $scope.newPres = function(presName) {
    $scope.presName = presName;
  }
  $scope.presNameURL = encodeURI($scope.presName);

  $scope.navSwitch = true;
  $scope.toggleNav = function() {
    $scope.navSwitch = !$scope.navSwitch;
    document.getElementById('main-logo').classList.toggle('logo-color');
  }

  $scope.chatShow = true;
  $scope.toggleChat = function() {
    $scope.slidePresentLoaded = false;
    $scope.chatShow = !$scope.chatShow;
    document.querySelector('header').classList.toggle('enlarge');
    document.querySelector('main').classList.toggle('enlarge');
    $timeout(function () {
      $scope.slidePresentLoaded = true;
    }, 5);
  }

  // toggle chat window
  $scope.chatShow = true;
  $scope.chatToggle = function() {
    $scope.chatShow = !$scope.chatShow;
  }

  // auth
  $scope.auth = userService;
  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.firebaseUser = firebaseUser;
    if (firebaseUser && !firebaseUser.displayName) {
      $scope.randomName();
    }
    $scope.checkTutor($scope.firebaseUser);
  });

  // email create account
  $scope.createUser = function(displayName, email, password1, password2) {
    if (displayName == null) {
      return $scope.createUserError = "Please enter a valid display name.";
    }
    if (email == null) {
      return $scope.createUserError = "Please enter a valid email.";
    }
    if (password1 === password2) {
      $scope.auth.$createUserWithEmailAndPassword(email, password1)
      .then(function(firebaseUser) {
        firebaseUser.updateProfile({displayName: displayName});
        $scope.firebaseUser = firebaseUser;
      })
      .catch(function(error) {
        $scope.createUserError = error;
      });
    } else {
      return $scope.createUserError = "Error: Passwords do not match";
    }
    document.getElementById("modal-signup").style.display = "none";
    $scope.createDisplayName = '';
    $scope.createEmail = '';
    $scope.createPassword1 = '';
    $scope.createPassword2 = '';
  }

  // email sign in
  $scope.signIn = function(email, password) {
    if (email == null || password == null) {
      return $scope.signInError = "Please enter a valid email and password or sign in another way."
    }
    $scope.auth.$signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.checkTutor($scope.firebaseUser);
      $scope.randomName();
    })
    .catch(function(error) {
      $scope.signInError = error;
    })
    document.getElementById("modal").style.display = "none";
    $scope.userEmail = '';
    $scope.userPassword = '';
  }

  // var uid = firebase.auth().currentUser.uid;

  //provider sign in
  $scope.signInProvider = function(provider) {
    $scope.auth.$signInWithRedirect(provider)
    .then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser.user;
      $scope.checkTutor($scope.firebaseUser);
    })
    .catch(function(error) {
      $scope.signInError = error;
    })
  }
  // TROUBLESHOOT
  // setInterval(function() {
  //   console.log($scope.firebaseUser);
  //   console.log($scope.tutorStatus);
  // }, 2000)

  // sign in anon (for demo)
  $scope.signInAnon = function() {
    $scope.auth.$signInAnonymously()
    .then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.randomName();
    })
    .catch(function(error) {
      $scope.signInError = error;
    })
    document.getElementById("modal").style.display = "none";
  }

  // assign random ID if no displayName
  $scope.randomName = function() {
    var names = chatService.names;
    if ($scope.firebaseUser.displayName === null) {
      $scope.username = {
        name: names[Math.floor(Math.random() * names.length)],
        uniqueNum: '#' + Math.floor(Math.random()*8999+1000)
      };
    }
  }

  // check for tutor status
  $scope.checkTutor = function(firebaseUser) {
    var tutors = chatService.tutors;
    if (firebaseUser !== null && $scope.firebaseUser.displayName !== null) {
      for (var i = 0; i < tutors.length; i++) {
        if (firebaseUser.displayName == tutors[i]) {
          $scope.tutorStatus = true;
        } else {
          $scope.tutorStatus = false;
        }
      }
    }
  }

  // get slides
  var getSlides = function() {
    chatService.getSlides()
    .then(function(resp) {
    $scope.allPresentations = resp;
    $scope.openPresentSlides($scope.presName, $scope.presIdentifier)
    $scope.getMessages($scope.presName);
    })
    .catch(function(error){
      $scope.fetchError = error;
    })
  }
  getSlides();

  // open slides to present
  $scope.openPresentSlides = function(presentPres, presIdentifier) {
    var allPresentations = $scope.allPresentations;
    var presContent = [];
    // if presName and unique ID match pres, add it to the pres queue
    for (var i = 0; i < allPresentations.length; i++) {
      if (presentPres === allPresentations[i].title && presIdentifier == allPresentations[i].urlIdentifier) {
        presContent = allPresentations[i].content;
      } else {
        $scope.getPresError = 'Could not retrieve this Presentation.';
      }
    }
    $scope.presentSlides = [{
      slide: true,
      slideInput: "# " + presentPres
    }];
    for (var i = 0; i < presContent.length; i++) {
      $scope.presentSlides.push(presContent[i]);
    }

    jumpStartSlides();
  }

  // submit slides to firebase
  $scope.submitSlides = function() {
    if ($scope.firebaseUser && $scope.firebaseUser.displayName) {
      $scope.username = $scope.firebaseUser.displayName;
    }
    var uniquePresUrl = Math.floor(Math.random()*8999+1000);
    chatService.savePresentation($scope.presName, $scope.editSlides, $scope.firebaseUser.uid, $scope.username, uniquePresUrl);
    $scope.presName = '';
    $scope.editSlides = [];
  }
  // TODO: presName ng-model not clearing out on submit

  // get messages
  $scope.getMessages = function(presName) {
    chatService.getMessages(presName)
    .then(function(resp) {
    $scope.messages = resp;
    })
    .catch(function(error){
      $scope.messages = error;
    })
  }
  $scope.getMessages($scope.presName);

  // submit messages
  $scope.submitMessage = function(newMessage) {
    if ($scope.firebaseUser && $scope.firebaseUser.displayName) {
      $scope.username = $scope.firebaseUser.displayName;
    }
    chatService.addMessage($scope.presName, newMessage, $scope.username, $scope.firebaseUser.uid, $scope.tutorStatus);
  }

})
