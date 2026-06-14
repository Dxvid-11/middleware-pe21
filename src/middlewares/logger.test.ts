import { requestLogger } from './logger';

describe('requestLogger', () => {

  let req: any;
  let res: any;
  let next: jest.Mock;
  let finishCallback: Function;

  beforeEach(() => {

    req = {
      method: 'GET',
      path: '/health'
    };

    finishCallback = () => {};

    res = {
      statusCode: 200,
      on: jest.fn((event, cb) => {
        if (event === 'finish') {
          finishCallback = cb;
        }
      })
    };

    next = jest.fn();

  });

  test('Debe llamar a next()', () => {

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();

  });

  test('Debe registrar método y ruta', () => {

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    requestLogger(req, res, next);

    finishCallback();

    expect(consoleSpy).toHaveBeenCalled();

    expect(consoleSpy.mock.calls[0][0]).toContain('GET /health');

    consoleSpy.mockRestore();

  });

});