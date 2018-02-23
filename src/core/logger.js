import TYPOR from '../util/typor'
import { LEVELS } from './enum'
import { generateConfig, generateAppender } from './config'
import { formatAppenderArgs } from './formatter'

let lid = 0

class Logger {
  lid
  name
  config

  static instance = null

  static get (options = {}) {
    const T = this

    if (!T.instance || options.isNew) {
      T.instance = new T(options)
    }

    return T.instance
  }

  constructor (options = {}) {
    this.lid = lid++
    this.name = options.name || `logger#${this.lid}`
    this.init(options)
  }

  init (options) {
    const config = generateConfig(options.config || {})

    this.setLevel(config.level)
    this.setPrefix(config.prefix)
    this.setSeparator(config.separator)
    this.setDateFormatter(config.dateFormatter)
    this.setAppender(config.appenders)
  }

  setConfig (key, value) {
    this.config = this.config || {}
    this.config[key] = value
  }

  setLevel (level) {
    this.setConfig('level', level)
  }

  setPrefix (prefix) {
    this.setConfig('prefix', prefix)
  }

  setSeparator (separator) {
    this.setConfig('separator', separator)
  }

  setDateFormatter (formatter) {
    this.setConfig('dateFormatter', formatter)
  }

  setAppender (appenders) {
    appenders = TYPOR.arr(appenders) ? appenders : [appenders]
    appenders = appenders.map((appender) => {
      return generateAppender(appender)
    }).filter(appender => !!appender)

    this.setConfig('appenders', appenders)
  }

  log () {
    this._invoke('LOG', arguments)
  }

  debug () {
    this._invoke('DEBUG', arguments)
  }

  info () {
    this._invoke('INFO', arguments)
  }

  warn () {
    this._invoke('WARN', arguments)
  }

  error () {
    this._invoke('ERROR', arguments)
  }

  _invoke (level, args) {
    let splittedArgs

    args = Array.prototype.slice.call(args)
    splittedArgs = {
      method: args.length > 1 ? args.shift() : null,
      messages: args
    }

    this.config.appenders.forEach((appender) => {
      this._append(appender, level, splittedArgs.method, splittedArgs.messages)
    })
  }

  _append (appender, level, method, messages) {
    const name = this.name
    const config = this.config
    const appenderLevel = appender.level || config.level

    if (LEVELS[level] >= LEVELS[appenderLevel]) {
      if (TYPOR.func(appender.handler)) {
        appender.handler(level, formatAppenderArgs({ name, config, appender, level, method, messages }))
      }
    }
  }
}

export default Logger
