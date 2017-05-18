angular.module('enthrall').service('chatService', function($firebaseArray) {

  // get messages, depends on presName
  this.getMessages = function(presName) {
    var resp = $firebaseArray(firebase.database().ref('chats/' + presName))
    return resp.$loaded();
  }


  // post new messages, depends on presName
  this.addMessage = function(presName, message, displayName, uid, tutorStatus) {
    var resp = $firebaseArray(firebase.database().ref('chats/' + presName));
    resp.$add({
      author: displayName,
      uid: uid,
      tutorStatus: tutorStatus,
      text: message,
      timestamp: new Date().getTime()
    })
    //.then(function(ref) {
    //   var id = ref.key;
    //   console.log("added record with id " + id);
    //   resp.$indexFor(id);
    // })
  }

  // get ALL slides
  this.getSlides = function() {
    var resp = $firebaseArray(firebase.database().ref('presentations'));
    return resp.$loaded();
  }

  // save slides to firebase
  this.savePresentation = function(presName, slidesContent, uid, displayName, presUrl) {
    var resp = $firebaseArray(firebase.database().ref('presentations'));
    resp.$add({
      title: presName,
      content: slidesContent,
      creatorId: uid,
      creatorName: displayName,
      createdAt: new Date().getTime(),
      urlIdentifier: presUrl
    })
    .catch(function(error) {
      console.error(error);
    })
  }


  // TODO: reset password email
  // $scope.authObj.$sendPasswordResetEmail("my@email.com")
  // .then(function() {
  //   console.log("Password reset email sent successfully!");
  // }).catch(function(error) {
  //   console.error("Error: ", error);
  // });

  // for mainController checkTutor status
  this.tutors = [
    "Michael Memory",
    "Noelle Reid",
    "Preston Mecham",
    // "Brett Gardiner"
  ]

  // for mainController anonymous user displayName
  this.names = [
    'Julia Roberts',
    'Derek Jeter',
    'Keith Richards',
    'Rush Limbaugh',
    'Meryl Streep',
    'Ryan Seacrest',
    'Al Pacino',
    'Jennifer Lawrence',
    'Donald Trump',
    'Carrie Underwood',
    'Jay-Z',
    'Harrison Ford',
    'Ian McKellan',
    'Michael Jordan',
    'Tom Hardy',
    'Lamar Odom',
    'Sandra Bullock',
    'Clint Eastwood',
    'Ellen DeGeneres',
    'Caitlyn Jenner',
    'Liam Hemsworth',
    'Tina Fey',
    'Will Smith',
    'Will Ferrell',
    'Chuck Norris',
    'Jim Carrey',
    'Queen Latifah',
    'Bruce Springsteen',
    'Steve Carell',
    'Rihanna',
    'William Shatner',
    '50 Cent',
    'Kanye West',
    'Jeff Bridges',
    'Hugh Jackman',
    'Aaron Carter'
  ]

})
