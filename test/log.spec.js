import * as log from '../src/log';

describe('log-mgr', () => {
  it('should be possible to create logging rules', () => {
    // Arrange & act
    let rule = new log.LoggingRule('*', log.logLevel.debug, {});

    // Assert
    expect(rule.pattern).toEqual('*');
    expect(rule.minLevel).toEqual(log.logLevel.debug);
    expect(rule.target).not.toBeNull();
  });

  it('should be possible to get logger by name', () => {
    // Arrange & act
    let logger = log.getLogger('test1');
    // Assert
    expect(logger).not.toBeNull();
  });

  it('should not be possible to log before configured', () => {
    // Arrange
    let logger = log.getLogger('test2');

    // Act & assert
    expect(() => logger.debug('some message')).toThrowError();
  });

  it('should be possible to log with configured logger', () => {
    // Arrange
    var config = new log.LoggingConfiguration();
    var target = new log.ConsoleLogTarget();
    config.addRule(new log.LoggingRule('*', log.logLevel.debug, target));

    // Act
    log.configure(config);
    log.getLogger('UnitTest').debug('A debug message');
    log.getLogger('UnitTest').info('An info message');
    log.getLogger('UnitTest').warning('A warning message');
    log.getLogger('UnitTest').error('An error message');
  });
});
