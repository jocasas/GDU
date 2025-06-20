import { errorHandler, AppError } from '../../../middlewares/errorHandler';

describe('Middleware errorHandler', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {}; // No se utiliza en este middleware
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn(); // Tampoco se utiliza aquí
  });

  // #01 Manejo de error personalizado
  // Parámetros: error con `status` y `message` definidos
  // Descripción: Debe devolver el mismo código de estado y mensaje que vienen desde el error
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

  // #02 Manejo de error genérico
  // Parámetros: error sin `status` ni mensaje definido
  // Descripción: Debe devolver status 500 y mensaje por defecto "Internal Server Error"
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
