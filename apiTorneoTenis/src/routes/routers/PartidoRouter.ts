import { NextFunction, Router } from 'express';

import Paths from '../../constants/Paths';
import { Partido, isPartido } from '@src/classes/dataClasses/Partido';
import PartidoRoutes from '../PartidoRoutes';
import { IReq } from '../types/types';
import { IRes } from '../types/express/misc';
import errors from '@src/constants/Errors'
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
 
const partidoRouter = Router();




function validatePartido(req: IReq<Partido>, res: IRes, next: NextFunction){
  if (!req.body || typeof req.body !== 'object'){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.BADBODY("Missing object partido")}); 
  }

    next()
    return

}

partidoRouter.get(
  Paths.Partidos.Get,
  PartidoRoutes.getAll
);

partidoRouter.get(
  Paths.Partidos.Byid,
  PartidoRoutes.getOne
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
  PartidoRoutes.delete,
);

export default partidoRouter;