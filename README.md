# The Name Game
This is my version the "Name Game" challenge. There are a few caveats and decisions that I would like to highlight about this code.

## Running the App
If you need an http server you can run `npm install -g http-server`. Then just run `http-server` from the root folder of the repo and launch [http://localhost:8080](http://localhost:8080).

## Functionality
The app has 3 play modes.

- **Default Mode:**
The default play mode will present you with 5 images of employees, both past and present, and you must select the correct one.

- **Mat(t) Mode:**
Mat(t) mode will present you with 5 images of employees, both past and present, that are named Matt. You must select the correct Matt.

- **Team Mode:**
Team mode has the same rules as default mode, but will present you with **only current** employees.

## Building the App
Because of the time constraints and the nature of the excercise I thought it best to focus on the app itself and not as much around bundling/building the app. In a real-world scenario, however, I would put together a real build process for the app.

## Chrome 58+ Only
I tested the site on Chrome 58 because that is what is on my laptop. I used a lot of ES6 features without any transpiling, so other browsers may or may not work out so well. Again in a real-world scenario I would use [Babel](http://babeljs.io/) and some polyfills to bring compatibility in line with other browsers.

## Classes/Modules
Again due to the desire to rapidly prototype app functionality and not get weighed down in having to worry about Module Loaders and tooling, I opted to not use classes or modules. Having the entirety of the app's structure in a single app.js file is not ideal, but it did lend to having less friction in quickly prototyping code.

## Unit Tests
There are no unit tests, but of course my code always works flawlessly the first time anyway... :laughing: ...no but really this could use some unit tests.

## Frameworks
I did not use a framework to handle anything. I was on the fence about this one, but bringing in a framework typically means also bringing in the build tools/chain for that framework, so I opted to keep it simple. I was leary of this decision when it came to things like rendering the profiles and some of the eventing, but in the end I think these things were simple enough to validate the decision.
