import { requireApiKey } from './auth';

describe('requireApiKey', () => {

  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {

    req = {
      headers: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();

  });

  test('Debe devolver 401 si falta x-api-key', () => {

    requireApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'API key inválida o ausente'
    });

    expect(next).not.toHaveBeenCalled();

  });

  test('Debe devolver 401 si la clave es incorrecta', () => {

    req.headers['x-api-key'] = 'incorrecta';

    requireApiKey(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();

  });

  test('Debe llamar a next() con una clave válida', () => {

    req.headers['x-api-key'] = 'secreto-demo';

    requireApiKey(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();

  });

});

