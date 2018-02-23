import TYPOR from '../util/typor'
import BuiltInAppenders from '../appenders'

export function generateConfig (config) {
  let presets = {
    level: 'LOG',
    prefix: '[%t] [%p] [%c->%m]',
    separator: '-',
    dateFormatter (d) {
      return d.toLocaleString()
    },
    appenders: ['console', 'localStorage']
  }

  Object.keys(config).forEach((key) => {
    const value = config[key]
    if (value != null) {
      presets[key] = value
    }
  })

  return presets
}

export function generateAppender (appender) {
  if (TYPOR.str(appender)) {
    return {
      handler: BuiltInAppenders[appender]
    }
  } else if (TYPOR.func(appender)) {
    return {
      handler: appender
    }
  } else if (TYPOR.obj(appender)) {
    if (TYPOR.str(appender.type)) {
      appender.handler = BuiltInAppenders[appender.type]
    }

    return appender
  } else {
    return null
  }
}
