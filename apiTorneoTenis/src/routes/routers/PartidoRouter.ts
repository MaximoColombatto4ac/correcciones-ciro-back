import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Partido } from '@src/classes/dataClasses/Partido';
import PartidoRoutes from '../PartidoRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
 
const partidoRouter = Router();

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
    return PartidoRoutes.getOne(req, res);
  } else {
    return PartidoRoutes.getAll(req, res);
  }
}

function validateId(req: IReq, res: IRes, next: NextFunction){
    if (req.query.id) {
      next()
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADDELETEREQUEST("Missing id parameter")}); 
    }
}

function validatePartido(req: IReq<Partido>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object partido")}); 
  }

  const partido = req.body
  if (Partido.isPartido(partido)){
    next()
    return
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADPARTIDOOBJECT()}); 
}

partidoRouter.get(
  Paths.Partidos.Get,
  checkGetType,
  callGetFunc,
);

partidoRouter.post(
  Paths.Partidos.Add,
  validatePartido,
  PartidoRoutes.add,
);

partidoRouter.patch(
  Paths.Partidos.Update,
  validatePartido,
  PartidoRoutes.update,
);
  
partidoRouter.delete(
  Paths.Partidos.Delete,
  validateId,
  PartidoRoutes.delete,
);

export default partidoRouter;