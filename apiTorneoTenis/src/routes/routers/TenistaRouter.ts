import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Tenista, isTenista } from '@src/classes/dataClasses/Tenista';
import TenistaRoutes from '../TenistaRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const tenistaRouter = Router();


function validateTenista(req: IReq<Tenista>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object tenista")}); 
  }

  const tenista = req.body

  if (isTenista(tenista)){
    next()
    return
  }

  return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADTENISTAOOBJECT()}); 
}

tenistaRouter.get(
  Paths.Tenistas.Get,
  TenistaRoutes.getAll
);

tenistaRouter.get(
  Paths.Tenistas.ById,
  TenistaRoutes.getOne  
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
  TenistaRoutes.delete,
);

export default tenistaRouter;