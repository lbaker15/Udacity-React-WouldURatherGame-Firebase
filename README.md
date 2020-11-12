<h1>About The Project</h1>
<p>This is a game where users are able to login and vote on 'would you rather' questions posted by other users.  Users have the opportunity to vote on existing questions, add new questions and view the leaderboard.</p>

<h1>Built With</h1>
<ul>
<li>The create-react-app framework</li>
<li>React</li>
<li>Redux</li>
<li>Firebase</li>
</ul>

<h1>Getting Started</h1>
This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.
<h2>Prerequisites</h3>
<li>npm</li>
npm install npm@latest -g

<h1>Installation</h1>
<ol>
<li>Clone the repo - https://github.com/lbaker15/RatherFirebase</li>
<li>Install NPM packages - npm install</li>
<li>Run NPM start</li>
</ol>

<h1>Document Structure</h1>
<ul>
<li>addQuestion.js - Renders the form that allows users to add questions</li>

<li>answered.js - Renders the unanswered and answered questions on the home page</li>

<li>App.js - The main application component, renders a navigation bar that allows users to toggle between pages after logging in.  Uses react router.</li>

<li>create.js - Renders a form that allows the creation of a new user.</li>

<li>error.js - An error page that is displayed when the user is not logged in</li>

<li>leaderboard.js - Renders a leaderboard which organises the uses based upon score</li>

<li>login.js -  Renders login form</li>

<li>theLink.js - Displayed when user clicks on question, if question is unanswered then the user is able to vote on question, upon answering information about how other users voted in the poll is displayed</li>
</ul>