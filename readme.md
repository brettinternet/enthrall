# Enthrall
Enthrall is a Single Page Application that allows groups to present and collaborate with their peers in an interactive learning process.

<!-- Enthrall fills the communication gaps between instructors and the audience in business, school, and groups. Chat accompanies each presentation and is accessible to the entire collaborative body through a mobile-ready page. Participants can read the chat and view the presentation without logging in. Colleagues can also log in with email, Google, Github or even anonymously to participate in the conversation. Presentation slides are limitless without being bound by software limitations. Rather, the internet is the only limitation for Enthrall. Likewise, presentation slides are accessible anywhere with web access. Enthrall offers an entirely new way to present. -->

## Project Status:
12/2/2016 - complete

## Features implemented:
* Firebase no-sql database storage with realtime data flow
* Custom account creation with displayname, email and password handled by firebase.
* Login modal with various login options including email, provider and anonymous login. The sidebar also comes with login/navigation options.
* Anonymous users are assigned a random celebrity display name with a unique identifier.
* All custom CSS and Angular by me unless specified. I've taken from the inspired philosophy of Material by Google and a similar color scheme to DiscordApp.
* Responsive design according to the content rather than by device. The mobile experience is rich with a split screen showing both the chat and the presentation.
* Scroll directive to maintain chat view at most recent chat. This directive is by Luegg.
* [ngShowdown](https://github.com/showdownjs/ng-showdown) with the slide creation for converting markdown to html. ngSanitize makes this safe.
* [Angular Slick Carousel](https://github.com/devmark/angular-slick-carousel) and [Slick Carousel](https://github.com/kenwheeler/slick) for creating and displaying the slideshows.
* An additional modal for students to see the URL in larger text and participate in chat.
* Collapsable chat sidebar with dynamic chat icon
* Chatting is tied to the slide presentation and accompanies the slideshow each time it's opened.
* [ngTouch](https://docs.angularjs.org/api/ngTouch) for a more responsive mobile experience.
* ngAnimate for my concise animation toggles. I use this to avoid mixing jQuery with Javascript.
* SASS and gulp for easy implementation of these packages

## What I've learned:
* Flexbox’s 'justify-content: flex-end' doesn’t play nice with overflow: scroll (see chat scroll). It's somewhat an extension of [this proposed fix](https://github.com/philipwalton/flexbugs/issues/136#issuecomment-199641030) (however that fix did not work for my setup - possibly because of my sticky scroll directive or ngRepeat). See my CSS note.
* Firebase is an amazing tool for server-less websites and authentication. There's also significant documentation on AngularFire.
* Solidified my understanding of promises and how javascript logic works with asynchronous actions. Additionally, the Angular Slick Carousel usage required a unique tasks to destroy and rebuild the carousel with asynchronous actions in the slideshows.
* Firebase's user tools allowed me to custom logic for handling users and user status. For example, check out the unique identifier qualification with message authors for anonymous users.
* The ease of use of jQuery is not always worth it when Javascript's custom and specific actions.
* [NativeScript](http://docs.nativescript.org/) allows for further mobile customizations, such as changing the mobile keyboard return key to "Send" for the messaging input. However, NativeScript is not compatible with Angular 1. Other options such as ngTouch make the mobile experience better for Angular 1.
* I initially didn't use template directives or views and everything was more convoluted and difficult. Using all of Angular's tools made organizing and coding much easier.

##### Bugs:
* ~~*FATAL*: Duplicate presentation titles causes an infinite loop in the openPresentSlides function and crashes the webapp. (!important) Implement a unique identifier for the presentations. I only found this because I had a fortunate console.log() in the function that repeated endlessly in the console.~~
* hide chat icon delays in switching to alternate icon
* ~~log in, then log out, then attempt to log in again button jquery fails to reopen modal.~~
* ~~signing in from left sidebar should close sidebar after authentication.~~
* if an anonymous user refreshes the page, they are assigned a new celebrity name from $onAuthStateChanged. Anonymous usernames are not associated with temporary uid's yet. Possible solutions: Store anonymous usernames in database and retrieve for $onAuthStateChanged. *OR search existing messages and if uid matches, then set author to current username!*
* ~~tutor login doesn't call tutorStatus function from firebaseUser promise~~
* ~~After signing out of the sidebar, the user cannot reopen the sidebar. This is probably from mixing javascript and jquery for handling the sidebar's open status.~~


#### Here's my todo list:

##### presentation creation:
* during setup, allow the creator to name tutors

##### presentation customizations:
* add color hover effect, toggle at menu bar and other presentation customizations
