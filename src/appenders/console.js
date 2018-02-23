export default function (level, args) {
  const map = {
    'LOG': 'log',
    'DEBUG': 'debug',
    'INFO': 'info',
    'WARN': 'warn',
    'ERROR': 'error'
  }
  const method = console[map[level]]

  return method.apply(console, args)
}
