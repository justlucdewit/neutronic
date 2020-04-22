# neutronic
## a lightweight opensource framework

## installation
```
npm i @luke_/neutronic
```

## usage
- first include neutronic using javascript
- then call the init function
```js
import neutronic from 'neutronic'
neutronic.init();
```

#### neutronic will now parse all the special neutronic html tags and do what it is supposed to do

## features

```html
<html>
	<body>
		<vars><!--this is a neutronic tag used for creating variables-->
			string firstName = "elon";
			string lastName = "musk";
			number age = 48; 
		</vars>

		<h1>
			hello there {{ firstName }} {{ lastName }}, you are {{ age }} years old!
		</h1>
	</body>
</html>
```