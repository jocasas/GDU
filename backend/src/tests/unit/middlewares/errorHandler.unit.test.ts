import { errorHandler, AppError } from '../../../middlewares/errorHandler';

describe('Middleware errorHandler', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {}; // no se usa en este middleware
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn(); // tampoco se usa en este middleware
  });

  it('devuelve el status y mensaje del error si están definidos', () => {
    const error: AppError = {
      name: 'CustomError',
      message: 'Algo salió mal',
      status: 400,
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Algo salió mal' });
  });

  it('devuelve 500 y mensaje por defecto si no se especifica status ni mensaje', () => {
    const error: AppError = {
      name: 'UnknownError',
      message: '',
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
