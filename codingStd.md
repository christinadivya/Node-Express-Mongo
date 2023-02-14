# Skillcord Coding Guidelines

## Technologies


* javascript specification
	+ [ES6](http://es6-features.org/) - ECMAScript 6, often referred to as is the upcoming sixth major release of the ECMAScript language specification. ECMAScript is the proper name for the language commonly referred to as JavaScript.

* Frontend 
	+ [HTML5](https://www.w3schools.com/html/html5_intro.asp) - HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It is the fifth and current major version of the HTML standard.
  + [CSS3](https://developer.mozilla.org/en/docs/Web/CSS/CSS3) - CSS3 is the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.1. It brings a lot of long-awaited novelties, like rounded corners, shadows, gradients, transitions or animations, as well as new layouts like multi-columns, flexible box or grid layouts
  + [Angular version 4.0.0](https://angular.io/) - Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges.
  + [TypeScript](https://www.typescriptlang.org/) - TypeScript is a free and open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.
  + [Grunt.js](https://gruntjs.com/) - Grunt is a JavaScript task runner, a tool 		used to automatically perform frequently used tasks such as minification, compilation, unit testing, linting, etc. It uses a command-line interface to run custom tasks defined in a file (known as a Gruntfile).
  + [Sass](http://sass-lang.com/) - Sass is a scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). SassScript is the scripting language itself. Sass consists of two syntaxes. The original syntax, called the indented syntax, uses a syntax similar to Haml.
  + [Less](http://lesscss.org/) - Less is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themeable and extendable.

* Backend
	+ [Node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
	+ [ Express.js](https://expressjs.com/) - Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

* Database
	+ [Cockroachdb](https://www.cockroachlabs.com/) - CockroachDB is a cloud-native distributed SQL database for building global, scalable cloud services that built on a transactional and strongly-consistent key-value store.
	+ [Mongodb](https://www.mongodb.com/) - MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.

* Testing
	+ [Chai](http://chaijs.com/) - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
	+ [Mocha](https://mochajs.org/) - Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.
	+ [Karma](https://karma-runner.github.io/1.0/index.html) - Karma is a test runner for JavaScript that runs on Node.js. It is very well suited to testing AngularJS or any other JavaScript projects. Karma just launches an HTTP server, and generates the test runner HTML file from your testing.

*  Code quality tool
	+ [JsHint](http://jshint.com/docs/) - JSHint is a static code analysis tool used in software development for checking if JavaScript source code complies with coding rules.

* API documentation generator for JS
	+ [JSDoc](http://usejsdoc.org/index.html) - JSDoc 3 is an API documentation generator for JavaScript. You add documentation comments directly to your source code, right alongside the code itself. The JSDoc tool will scan your source code and generate an HTML documentation website for you.

* Cloud Service
	+ [AWS](https://aws.amazon.com/) - Amazon Web Services (AWS) is a secure cloud services platform, offering compute power, database storage, content delivery.
	+ [Microsoft Azure](https://azure.microsoft.com/en-in/) - Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications. It provides software as a service (SAAS), platform as a service and infrastructure as a service


## How to contribute

1.Clone the codebase from github

	`git clone https://github.com/infomaxis/skillcordBackend`

2.Pull the 'develop' branch from the repo as all the development is on that branch. Make sure the code is upto date with development branch time to time.
 
	`git checkout develop`

3.Create a feature branch for the code development

  `git checkout -b my-feature`

4.Scaffold an angular app using ng-cli
	
  `npm install -g @angular/cli`
    
  `ng new PROJECT-NAME`
    
	`cd PROJECT-NAME`
    
	`ng serve`
    
5.Need to write unit test cases for front end and backend
	
  *Frontend*
    
  	`npm install karma karma-jasmine jasmine-core karma-chrome-launcher --save-dev`
    
    `karma init karma.conf.js`

    `karma run`
    
  *Backend*
    
    `npm install -g mocha chai`
		 
		`npm test`
         
6.Write documentation using JSDoc
 
 	`npm install -g jsdoc &&  jsdoc yourFile.js`
    

7.JsHint is the code quality tool. For installation and use

	`npm install -g jshint && jshint server.js`


8.Start the server after all unit test cases are completed successfully.

	`npm run test && nodemon server.js`
    
9.Do smoke and sanity test of the application.

10.Use grunt for concurrent task execution in angular.
	
	`npm install -g grunt-cli`
  
  `grunt serve`

11.Create a pull request with proper commit message having signedoffby, reviewedby/ackedby tags. Add relevant reviewers in the request to notify

12.Every commit should be independent to bisect easily. Each commit should be a self contained and short for easy review.  The commit message should clearly explain the purpose of commit.

13.Attach testing report in the commit message while creating the pull request.

14.Create a pull request from the local branch to develop branch for reviewing. Make sure to add relevant reviewers in the request to notify them.

15.Follow the file structure below in the document for code consistency.

---



##Coding Standards



* Class names should be capitalized using upper camel case.

* Coding should be in ES6 strict mode

> ECMAScript 5's strict mode is a way to opt into a restricted variant of JavaScript. Strict mode isn't just a subset: it intentionally has different semantics from normal code.Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode. Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.

* All variables/properties declaration should be meaningful and use lower camel case capitalization.  

 `var someVariable = [];`

* Code should have proper exception handlers

			
```javascript		
	try {		
		tryCode - Block of code to try		
	}		
	catch(err) {		
		catchCode - Block of code to handle errors		
	}		
	finally {		
		finallyCode - Block of code to be executed regardless of the try / catch result		
	}		
```

* Need proper promise functions for handling asynchronous function calls.


```javascript

var p = new Promise(function(resolve, reject) {

  // Do an async task async task and then...

  if(condition) {

resolve('Success!');

}

else {

reject('Failure!');

}

});

p.then(function() {

/* do something with the result */

}).catch(function() {

/* error :( */

})

```

* Common indentation to avoid spacing conflicts, 2 space tab is the standard.

* String should have single quotes and JSON is in double quotes.

``` javascript

var exampleString = 'Example String';

var sampleObj = {key: "value"}

```

* Constants should keep in the config file or it should be capitalized.

```

const PI = 3.141593; //es6

var PI = 3.41593 //es5

```

* All functions should comment out properly.



---

## Folder Structure

#### Frontend Structure

+ Project
	- index.html                      // Starting page
  	- app/                            // Main app folder
    	+ main.ts                       // bootstrap here
    	+ app.component.css
    	+ app.component.html
    	+ app.component.ts           // Root component for the app (e.g. AppComponent)
    	+ heroes/                      // Feature folder
    		- heroes.ts                   // Barrel module for the feature
      		- heroes.component.ts         // Router component (e.g. HeroesComponent)
      		- hero-list.component.css
     	 	- hero-list.component.html
      		- hero-list.component.ts      // list of heroes (e.g. HeroListComponent)
      		- hero-detail.component.css
      		- hero-detail.component.html
      		- hero-detail.component.ts    // hero details  (e.g. HeroDetailComponent)
      		- hero.service.ts         // A feature specific service  (e.g. HeroService)
      	+ shared/                       // Shared features across the app
      		- shared.ts                   // Barrel module for shared features
      		- logger.service.ts           // Example shared service (e.g. LoggerService)
      		- spinner.component.ts    // Example shared component  (e.g. SpinnerComponent)
      		- config.ts                   // Shared configuration

#### Backend Structure

+ Project
	- controllers
		+ index.js
	- helpers
		+ dates.js
	- concepts
		+ user.js
	- middlewares
		+ auth.js
	- public
		+ libs
		+ css
		+ img
	- views
		+ users
			* user.jade
	- tests
		+ controllers
		+ models
			* user.js
		+ middlewares
		+ integration
		+ ui
	- .gitignore
	- app.js
	- package.json