import { expect } from 'chai'
import Logger from '@/core/logger'

describe('Create Logger', function () {
  const dateFormatter = function (date) {
    return date.getTime()
  }
  const logger = new Logger({
    name: 'UnitTest',
    config: {
      level: 'ERROR',
      prefix: '[%p] [%t] [%c->%m]',
      separator: '>>>',
      dateFormatter,
      appenders: 'console'
    }
  })

  it('should have a right name', function () {
    expect(logger.name).to.equal('UnitTest')
  })

  it('should return an object when getting config', function () {
    expect(logger.config).to.be.a('object')
  })

  it('should return a right level of config', function () {
    expect(logger.config.level).to.equal('ERROR')
  })

  it('should return a right prefix of config', function () {
    expect(logger.config.prefix).to.equal('[%p] [%t] [%c->%m]')
  })

  it('should return a right separator of config', function () {
    expect(logger.config.separator).to.equal('>>>')
  })

  it('should return a right dateFormatter of config', function () {
    expect(logger.config.dateFormatter).to.equal(dateFormatter)
  })

  it('should return a right appenders of config', function () {
    expect(logger.config.appenders.length).to.equal(1)
    expect(logger.config.appenders[0]).to.be.a('object')
    expect(logger.config.appenders[0].handler).to.be.a('function')
  })
})

describe('Use Default Date Formatter', function () {
  const logger = new Logger({
    name: 'UnitTest',
    config: {
      dateFormatter: null
    }
  })

  it('should use the default date formatter when config is not present', function () {
    expect(logger.config.dateFormatter).to.be.a('function')
  })
})

describe('Use Default Instance Name', function () {
  const logger = new Logger()

  it('should use the default instance name', function () {
    expect(logger.name).to.be.a('string')
  })
})

describe('Use String Options', function () {
  const logger = new Logger('STR')

  it('should name be the giving string options', function () {
    expect(logger.name).to.equal('STR')
  })
})

describe('Different Config of Appenders', function () {
  const logger = new Logger({
    name: 'UnitTest',
    config: {
      appenders: [
        'console',
        function () {},
        {
          type: 'localstorage'
        },
        {
          handler: function () {}
        },
        2018
      ]
    }
  })

  logger.log('appenders', 'foobar')

  it('should have right appenders', function () {
    expect(logger.config.appenders.length).to.equal(4)
    expect(logger.config.appenders[1]).to.be.a('object')
    expect(logger.config.appenders[2].handler).to.be.a('function')
  })
})

describe('Console Appender', function () {
  const logger = new Logger({
    name: 'UnitTest',
    config: {
      level: 'LOG',
      appenders: 'console'
    }
  })
  logger.debug('foo', 'bar')
  logger.log('foo', 'bar')
  logger.info('foo', 'bar')
  logger.warn('foo', 'bar')
  logger.error('foo', 'bar')
  logger.error('Only message arguments')

  it('should use the default date formatter when config is not supported', function () {
    expect(logger.config.dateFormatter).to.be.a('function')
  })
})

describe('Global Logger', function () {
  const logger1 = Logger.get({
    name: 'GLOBAL1'
  })
  const logger2 = Logger.get({
    name: 'GLOBAL2',
    isNew: true,
    config: {
      separator: '==='
    }
  })
  const logger3 = Logger.get()

  logger1.log('foo', 'bar')
  logger2.log('foo', 'bar')
  logger3.log('foo', 'bar')

  it('should have same instance', function () {
    expect(logger1.name).to.equal('GLOBAL1')
  })

  it('should renew global logger when options.isNew is present', function () {
    expect(logger2.name).to.equal('GLOBAL2')
    expect(logger2).to.not.equal(logger1)
    expect(logger2.name).to.equal('GLOBAL2')
    expect(logger3.config.separator).to.equal('===')
  })
})
