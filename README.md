# logger

[![CircleCI](https://img.shields.io/circleci/project/github/felixpy/logger.svg)](https://circleci.com/gh/felixpy/logger)
[![Codecov](https://img.shields.io/codecov/c/github/felixpy/logger.svg)](https://codecov.io/gh/felixpy/logger)
[![Version](https://img.shields.io/npm/v/@felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)
[![License](https://img.shields.io/npm/l/@felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)
[![Dependencies](https://img.shields.io/hackage-deps/v/@felixpy/logger.svg)](https://www.npmjs.com/package/@felixpy/logger)

A simple javascript logger for web developers.

## Installation

```bash
npm i @felixpy/logger --save
```

## Usage

```js
import Logger from '@felixpy/logger'

const logger = new Logger('felixpy')

logger.log('say', 'Hello Logger')
```