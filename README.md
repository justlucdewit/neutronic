# neutronic
## A lightweight, open source JavaScript framework

## Installation
```
npm i @luke_/neutronic
```

## Usage
- First include neutronic using JavaScript
- Then call the init function
```js
import neutronic from 'neutronic'
neutronic.init();
```

#### Neutronic will now parse all the special neutronic HTML tags and do what it is supposed to do.

## Features

```html
<html>
	<body>
		<vars><!--This is a neutronic tag used for creating variables-->
			string firstName = "elon";
			string lastName = "musk";
			number age = 48; 
		</vars>

		<h1>
			Hello there {{ firstName }} {{ lastName }}, you are {{ age }} years old!
		</h1>
	</body>
</html>
```
