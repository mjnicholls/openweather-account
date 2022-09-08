<h1>owm-account</h1>
<hr><p>Personal account for OWM written in React.JS</p><h2>General Information</h2>
<hr><ul>
Create user-customised triggers and events for forecasted weather.
</ul><h2>Structure</h2>
<hr>
<pre>├───api
├───assets
│   └───scss
├───components
├───features
│   ├───auth
│   └───triggers
├───pages
└───utils</pre>
<h2>Components</h2>
<hr>
<code>BeatLoader.js</code>
<p>Displays a customised graphic while waiting for page to load.</p>
<code>Condition.js</code>
<p>Displays a series of weather parameters.</p>
<code>CreateTriggerButton.js</code>
<p>Checks the amount of triggers on user's tarriff before allowing them to proceed with creating a trigger.</p>
<code>CreateTriggerCard.js</code>
<p>Displays alert populated with the user's trigger information upon creation of trigger.</p>
<code>Day.js</code>
<p>Displays information on events per day.</p>
<code>DeleteTrigger.js</code> / <code>DeleteTriggerCard.js</code>
<p>Displays existing events for this trigger and shows a confirmation modal before user chooses to delete trigger.</p>
<code>EditableInput.js</code>
<p>Reusable component for editing and saving trigger names.</p>
<code>EditTrigger.js</code> / <code>EditTriggerCard.js</code>
<p>Displays modal allowing user to change name and status of their trigger and updates on save.</p>
<code>EmailNotifications.js</code>
<p>Allows user to add email addresses for notifications, edit or delete, and checks for emails already listed.</p>
<code>ErrorModal.js</code>
<p>Standard error modal for incorrect or failed requests.</p>
<code>InfoWindow.js</code>
<p>Displays a window on the map when clicked or when location is selected in form.</p>
<code>Location.js</code>
<p>Displays subcomponents for location and coordinates.</p>
<code>LocationAutoComplete.js</code>
<p>Displays location using Google autocomplete API.</p>
<code>LocationAutoComplete.js</code>
<p>Displays form for submitting coordinates to the Google map.</p>
<code>Map.js</code>
<p>Displays customised Google Map component.</p>
<code>Notifications.js</code>
<p>Displays dropdown menu and responsive alert message.</p>
<code>StatusToggle.js</code>
<p>For on/off toggle with custom CSS in component.</p>
<code>TriggerEvents.js</code>
<p>Displays event total for each trigger.</p>
<h2>Available Scripts</h2>
<hr><p>In the project directory, you can run:</p>
<h3><code>npm start</code></h3>
<p>Runs the app in the development mode.<br>
Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</p>
<p>The page will reload if you make edits.<br>
You will also see any lint errors in the console.</p>
<h3><code>npm test</code></h3>
<p>Launches the test runner in the interactive watch mode.<br>
See the section about <a href="https://facebook.github.io/create-react-app/docs/running-tests">running tests</a> for more information.</p>
<h3><code>npm run build</code></h3>
<p>Builds the app for production to the <code>build</code> folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.</p>
<p>The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!</p>
<p>See the section about <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for more information.</p>
<h3><code>npm run eject</code></h3>
<p><strong>Note: this is a one-way operation. Once you <code>eject</code>, you can’t go back!</strong></p>
<p>If you aren’t satisfied with the build tool and configuration choices, you can <code>eject</code> at any time. This command will remove the single build dependency from your project.</p>
<p>Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except <code>eject</code> will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.</p>
<p>You don’t have to ever use <code>eject</code>. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.</p>
<h3><code>npm run lint -- --fix</code></h3>
<p>Runs ESLint to check for problematic patterns in your JS code.</p>
<h3><code>npm format</code></h3>
<p>Runs Prettier to fix problematic formatting in your code.</p>
<h2>Deploy</h2>
<hr>
<code>https://dashboard-weather.owm.io/forecasted-events</code>
<p>Test server URL</p>
<code>git push</code>
<p>1. Push the changes on your branch.</p>
<p>2. Make sure pipelines have passed. You can see it in gitlab in either Repository/Commits section.</p>
<code>(https://gitlab.openweathermap.org/frontend/owm-account/-/commits/your_branch)</code>
<p>CI/CD Pipelines</p>
<code>(https://gitlab.openweathermap.org/frontend/owm-account/-/pipelines)</code>
<br>
<p>3. Update the container on the server:</p>
<code>ssh YOURNAME@phase.owm.io</code>
<p>log in to the server</p>
<code>cd /opt/containers/weather-dashboard</code>
<p>move to your project folder</p>
<code>./update.sh --branch name-- </code>
<p>call update on the branch you are pushing, in this case <code>./update.sh your_branch</code>)</p> 