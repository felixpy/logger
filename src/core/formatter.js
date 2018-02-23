const formatDate = function (formatter) {
  const date = new Date()
  return formatter.call(date, date)
}

const formatPrefix = function (prefix, options) {
  const map = {
    '%c': options.name,
    '%m': options.method,
    '%p': options.level,
    '%t': options.date
  }

  return prefix.replace(/(%c|%m|%p|%t)/g, (c) => {
    return map[c] || '?'
  })
}

const formatAppenderArgs = function (options) {
  const { name, config, appender, level, method, messages } = options
  const prefix = appender.prefix || config.prefix
  const separator = appender.separator || config.separator
  const dateFormatter = appender.dateFormatter || config.dateFormatter
  const formattedDate = formatDate(dateFormatter)
  const formattedPrefix = formatPrefix(prefix, { name, method, level, date: formattedDate })

  return [formattedPrefix, separator].concat(messages)
}

export {
  formatAppenderArgs
}
