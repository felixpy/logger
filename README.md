# logger

A simple javascript logger for web developers.

[![CircleCI](https://img.shields.io/circleci/project/github/felixpy/logger.svg)](https://circleci.com/gh/felixpy/logger)
[![Codecov](https://img.shields.io/codecov/c/github/felixpy/logger.svg)](https://codecov.io/gh/felixpy/logger)
[![Version](https://img.shields.io/npm/v/@felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)
[![License](https://img.shields.io/npm/l/@felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)
[![Dependencies](https://img.shields.io/david/felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)

## Installation

### Using NPM

```sh
npm i @felixpy/logger --save
```

### Using CDN

```html
<script src="https://unpkg.com/@felixpy/logger"></script>
```

## Quick Start

```js
const logger = new Logger({
  name: 'LoggerName',
  config: {
    separator: '>>>',
    dateFormatter: function(date) {
      return date.toISOString()
    }
  }
})

logger.log('MethodName', 'Hello Logger!')
// [2018-02-25T14:36:49.287Z] [LOG] [LoggerName->MethodName] >>> Hello Logger!
```

## Constructor

Using `new Logger(options)` to create an instance.

### options.name

Type: `String`

Optional logger name, by default it will be `Logger#{id}`.

### options.config

Type: `Object`

Custom configuration of logger, these are available keys, none is required:

```js
{
  // The minimum log level to show,
  // Possible values: ALL, DEBUG, LOG, INFO, WARN, ERROR, OFF.
  level: 'LOG',

  // Prefix pattern:
  //   %t: date
  //   %p: priority
  //   %c: logger name
  //   %m: method name
  prefix: '[%t] [%p] [%c->%m]',

  // The separator symbol between prefix and messages.
  separator: '-',

  // Callback function to format date.
  dateFormatter (d) {
    return d.toLocaleString()
  },

  // Appenders, it can be built-in appender name or your own appender definition.
  appenders: ['console']
}
```

#### options.config.appenders

Type: `String | Function | Object | Array<String | Function | Object>`

Normally, you shold specify an object appender option like this:

```js
{
  // built-in appender name
  type: 'console'
}
// or
{
  /**
   * custom appender callback
   * @param {string} level - log level
   * @param {string} args - message arguments
   */
  handler: function (level, args) {}
}
```

Also you can simply specify a string as built-in appender name or a function as appender callback.

When you want use multiple appenders, you just need put them in an array.

## Instance Methods

Each instance of logger will have these methods:

`.debug(methodName, message, [...more])`

Log with `DEBUG` priority, example:

```js
logger.debug('Save', 'Parameters: ', '{"name":"Felix"}')
```

`.log(methodName, message, [...more])`

Log with `LOG` priority.

`.info(methodName, message, [...more])`

Log with `INFO` priority.

`.warn(methodName, message, [...more])`

Log with `WARN` priority.

`.error(methodName, message, [...more])`

Log with `ERROR` priority.

`.setLevel(level)`

Set minimum level to show logs, example:

```js
logger.setLevel('INFO')
```

`.setPrefix(prefix)`

Set prefix pattern of logger, example:

```js
logger.setPrefix('[Date->%t] [Priority->%p] [%c->%m]')
```

`.setSeparator(separator)`

Set separator of logger, example:

```js
logger.setSeparator('>>>')
```

`.setDateFormatter(dateFormatter)`

Set date formatter of logger, example:

```js
logger.setDateFormatter(function(date) {
  return date.toGMTString()
})
```

`.setAppender(appenders)`

Set appenders of logger, example:

```js
const myAppender = {
  handler: function (level, args) { /* ... */}
}

logger.setAppender(['console', myAppender])
```

## Global API

### Logger.get(options)

Return an single instance by specified options.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018, Felix Yang