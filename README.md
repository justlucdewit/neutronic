# neutronic
## A lightweight, open source JavaScript framework

## Installation
```
npm i @luke_/neutronic
```

## Usage
- first install neutronic like descibed above^
- put this script tag in your header: `<script type="text/javascript" src="node_modules/@luke_/neutronic/neutronic.js"></script>`
- start using neutronic's features

#### Neutronic will now parse all the special neutronic HTML tags and do what it is supposed to do.

## Features

```html
<html>
	<body>
		<vars><!--This is a neutronic tag used for creating variables-->
			firstName = "elon";
			lastName = "musk";
			age = 48; 
		</vars>

		<h1>
			Hello there {{ firstName }} {{ lastName }}, you are {{ age }} years old!
		</h1>
	</body>
</html>
```
