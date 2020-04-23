# neutronic
## A lightweight, open source JavaScript framework

## Installation
```
npm i @luke_/neutronic
```

## Usage
- First install neutronic like descibed above^
- Put this script tag in your header: `<script type="text/javascript" src="node_modules/@luke_/neutronic/neutronic.js"></script>`
- Start using neutronic's features

Or you can use the github hosted script tag, however it does need an internet connection to work but you dont need NPM
- Put this script tag in your header: `<script src="https://raw.githubusercontent.com/justlucdewit/neutronic/master/neutronic.js"></script> `
- Start using neutronic's features

#### Neutronic will now parse all the special neutronic HTML tags and do what it is supposed to do.

## Mustaches

```html
<html>
	<head>
		<script type="text/javascript" src="node_modules/@luke_/neutronic/neutronic.js"></script>
	</head>
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

## External imports
```html
<html>
	<head>
		<script type="text/javascript" src="node_modules/@luke_/neutronic/neutronic.js"></script>
	</head>
	<body>
		<!--
		note: import tags may not be self closing,
		this could hide parts of your site!
		-->
		<import src="modules/header.html"></import>
		<import src="modules/navbar.html"></import>
		<import src="modules/main.html"></import>
		<import src="modules/footer.html"></import>
	</body>
</html>
```
