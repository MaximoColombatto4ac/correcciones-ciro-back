import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Tenista } from '@src/classes/dataClasses/Tenista';
import TenistaRoutes from '../TenistaRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const tenistaRouter = Router();

function checkGetType(req: IReq, res: any, next: NextFunction) {
  if (req.query.id) {
    (req as any).routeHandler = 'getOne';
  } else {
    (req as any).routeHandler = 'getAll';
  }
  next();
}

function callGetFunc(req: IReq, res: IRes){
  if ((req as any).routeHandler === 'getOne') {
    return TenistaRoutes.getOne(req, res);
  } else {
    return TenistaRoutes.getAll(req, res);
  }
}

function validateId(req: IReq, res: IRes, next: NextFunction){
    if (req.query.id) {
      next()
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADDELETEREQUEST("Missing id")}); 
    }
}

function validateTenista(req: IReq<Tenista>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object tenista")}); 
  }

  const tenista = req.body

  if (Tenista.isTenista(tenista)){
    next()
    return
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADTENISTAOOBJECT()}); 
}

tenistaRouter.get(
  Paths.Tenistas.Get,
  checkGetType,
  callGetFunc,
);

tenistaRouter.post(
  Paths.Tenistas.Add,
  validateTenista,
  TenistaRoutes.add,
);

tenistaRouter.patch(
  Paths.Tenistas.Update,
  validateTenista,
  TenistaRoutes.update,
);

tenistaRouter.delete(
  Paths.Tenistas.Delete,
  validateId,
  TenistaRoutes.delete,
);

export default tenistaRouter;