# Korean Language Game
A react app created to gamify the learning of KOR 1001 at Georgia Tech. The app will include vocabulary flashcards for each unit of KOR 1001, as well as Squid Game inspired learning minigames.

# Release Notes

## Version 1.4.0

### New Features
* Login/Register/ForgotPassword page UI have been updated to match theme of website.
* Flashcard input from user can now be saved in browser to allow users to return to them later.
* Users now given the option to "favorite" cards that they wish to return to specifically.
* Filter functionality has been added so that users can seperate cards they wish to see from those they don't.
* Marble game has been equipped with a time remaining progress bar.
* A cloud service has been added to the backend to allow universal access for the user.

### Bug Fixes
* Scaling of UI has been corrected so that components don't go off the screen or fit awkwardly on the page.
* Refreshing the page no longer removes flashcards from memory.
  
### Known Issues
* Forgot Password link was not linked correctly to Forgot Password page.
* GitHub commits and branches were not up to date

## Version 1.3.0

### New Features
* Basic Layout and design of Chatbox has been coded. ChatGPT api to bring functionality will be implemented in later sprints
* Access path to all mini games has been employed
* Uploading images to flashcards functionality has been developed. This includes gifs and allows users to use both a url and their own camera roll to choose a photo/gif. Additionally, users' can preview what the flashcard will look like with the chosen image before saving and adding back to the flaschard stack.
* Option to choose difficulty has been added. This allots a timer that with increasing difficult, reduces the amount of time given to correctly answer the question.
* The ability to login and register has been added. This employs the Google Firebase which will allow for saving accounts, users' names, achievements and progress in the future.
### Bug Fixes
* No bug fixes employed this sprint
### Known Issues
* Some mini games had no buttons assiociated with them to allow users to navigate to them on the application and play them.
* Some of the games had no "quit" or "exit" button to allow users to safely quit the game and get back the unit page or home page.


## Version 1.2.0

### New Features
* Added simplistic honey comb game that allows for practice with vocabulary.
* Added rudimentary flashcards to all units that consist of new vocabulary for users to practice
* Added template for what is soon to be an in-class trivia style game similar to Kahoot where by in which the entire class is engaged through their mobile devices and can answer questions under time limit. They earn points for accuracy and speed in answering.
### Bug Fixes
* Buttons now all are routed to the appropriate unit and games.

### Known Issues
* Users requested a way to submit complaints/bugs/typos they had with the website. There were numerous since the site is currently in the beta testing phase. Thus, this was a big issue that needed to be resolved and would help improve further development.
* Unit 1 button led to Unit 2. Additionally some of the buttons to choose a game led to the incorrect game (e.g. flashcards led to honeycomb game) or to an "unknown page."


## Version 0.4.0

### New Features
Our goal for the fourth sprint was to have a playable and nearly finalized version of the minigames. Both games have updated art, animations, game modes, and UI, and all new updates to the games are successfully working.
* Answer Language settings added to both the Red Light Green Light and the Tug of War minigames. The answer language corresponds to which language the user wants to answer the question in.
* Working animations for both minigames.
* Play again option added for both minigames. The play again option allows the user to reset the game settings, which are the difficulty level and answer language settings, and then replay the game. 

### Bug Fixes
* Fixed issue with Red Light Green Light UI where the question div would move depending on the length of the question.
* Fixed issue with light changing to red when a user incorrectly answers a question in the Red Light Green Light minigame.

### Known Issues
* The turning animation for the Red Light Green Light doll is not in the correct position for all screen resolutions.

## Version 0.3.0

### New Features
Our goal for the third sprint was to incorporate grammar questions into our learning minigames, as well as add difficulty levels to the Red Light Green Light minigame.
* Easy, Medium, and Hard difficulty level settings added to Red Light Green Light minigame. The difficulty choice corresponds to how long the user has to answer a question before the light turns red.
* Option to play the Red Light Green Light minigame in grammar question mode.
* Option to play the Tug of War minigame in grammar mode.

### Bug Fixes
* Fixed issue with Red Light Green Light minigame where a user not answering a question resulted in the loss of multiple lives.

### Known Issues
* The light does not change to red when a user incorrectly answers a question in the Red Light Green Light minigame.

## Version 0.2.0

### New Features
Our goal for the second sprint was to implement the flashcards for each unit, a more fleshed out version of our minigames, and more art for all the pages throughout the web app.
* Home page with custom art, new title, and introduction to the web app
* Click interactive and unique flashcards for each unit
* Red light green light minigame now has custom art and functionality to be able to play the game
* Tug of war minigame now has custom art and functionality to be able to play the game

### Bug Fixes
* Basic CSS fixes throughout the web app to clean up interface/styling


## Version 0.1.0

### New Features
Our goal for this first sprint was to learn react and to create the basic pages and navigation flow for our web app.
* Home page with "PLAY" button to transition to a list of the KOR 1001 course units.
* Units page with buttons for each KOR 1001 unit.
* Study option pages for each unit with buttons to access vocab, the red light green light minigame, and the tug of war minigame.
* A mostly blank vocab page for each unit (to be implemented later).
* A mostly blank red light green light minigame page (to be implemented later).
* A mostly blank tug of war minigame page (to be implemented later).
* A mostly blank About page (to be implemented later).
* A navigation bar on every page to navigate to the Home, Units, and About pages.

### Bug Fixes
Not applicable, as this was our first sprint.

# Installation Guide

## Pre-requisites
* [Node v16.17.0](https://nodejs.org/download/release/v16.17.0/)
  * For simple installation use the appropriate installer found on the webpage:
    * Windows 32-bit: **node-v16.17.0-x86.msi**
    * Windows 64-bit: **node-v16.17.0-x64.msi**
    * macOS: **node-v16.17.0.pkg**
  * Advanced users may be interested in a version manager for Node:
    * Windows: https://github.com/coreybutler/nvm-windows
    * macOS/Linux: https://github.com/nvm-sh/nvm
* Optional: [Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)
  * Git or GitHub Desktop are only required to clone the repository

## Dependent Libraries
* This project does depend on OpenAi's api to power the chatbot. Currently the project is loaded with intial funding. The OpenAI account and gmail linked to the account's credentials have been emailed to the client. 

## Download Instructions

### Installation Script (Windows)
1. Download the script `install.bat` located in the root of this repository.
2. Move the script to the folder you would like the repository to be installed at.
3. Double click the file to run it.
4. After the command prompt window closes, there should be a `JIC-2102` folder.
5. Navigate to this folder and continue from step 5 of the **Manual Installation** section.

### Manual Installation
1. Make sure the appropriate version of Node is installed.
2. Clone this repository using one of the following methods:
  * Install ZIP button found by pressing the green `<> Code` button at the top right of [this page](https://github.com/ishawng/JIC-2102)
    * Extract the downloaded ZIP file to a convenient location
  * Git
  * GitHub Desktop
3. Open a terminal or command prompt window and navigate to the downloaded folder.
  * This is typically done using the `cd` command. For more info, see https://en.wikipedia.org/wiki/Cd_(command).
4. Run the command `npm install`.
5. Run the command `pip install openai`
6. Run the command `npm install @chatscope/chat-ui-kit-react`
7. Run the command `npm install npm install openai@^4.0.0`
8. Your environment should now be ready for local development. To launch the development server, run the command `npm start`.

## Build Instructions
1. Make sure steps 1-7 from the **Download Instructions** section are completed.
2. Run the command `npm run build` in the root folder of the project.
  * This will generate a `build` folder in the same directory as the project.

## Run Instructions
1. Make sure all the steps in the **Build Instructions** section are completed.
2. Sign into the [Georgia Tech Plesk Hosting website](https://hosting.gatech.edu/plesk/my).
3. Click on My Sites at the left side
4. Find `korean-game.modlangs.gatech.edu` in the list of sites and click the `Manage` button.
  * If you do not see the site, contact Dr. Yongtaek Kim and ask him to make you an authorized user of the website.
  * If possible, designate a single member of your team to be an authorized user.
  * Instructions on how to designate an authorized user can be found on [this page](https://webmasters.gatech.edu/handbook/add-administrator-your-web-hosting-control-panel).
5. Press the `Login` button near the top of the page.
6. Click on the `File Manager` button in the grid near the bottom of the page.
7. Navigate to the `httpdocs` folder.
8. Replace the `build` folder in this directory with your new `build` folder.
9. Return to the main website control page by using the back button or by clicking the hyperlink at the top of the page (`File Manager for "korean-game.modlangs.gatech.edu"`).
10. Click on the `Node.js` button.
11. Press the `Restart App` button.
12. After a few seconds, the website should be updated with your changes and live at https://korean-game.modlangs.gatech.edu. (Be sure to refresh the page).

## Troubleshooting
* If you notice that the prompt says X vulnerabilities after running `npm install` do not be alarmed, this is expected.
  * If you want more information about this, see this [blog post](https://www.voitanos.io/blog/don-t-be-alarmed-by-vulnerabilities-after-running-npm-install/).
* If you have issues signing into the Plesk Hosting website, make sure you are either on a campus network or on the campus VPN.
  * See this [knowledge base article](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0026837) for more information.
* If you see the following error when you try running `npm start`:
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! _______@X.X.X start: `react-scripts start`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the _______@X.X.X start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```
  * Make sure you run `npm install` before running `npm start`.
* If you have any other questions about React functionality or features, see these [docs](https://reactjs.org/docs/getting-started.html).
