import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {validateJwtMiddlewareFn, validateMiddlewareFn, validateUserInAnyRoleMiddlewareFn} from "./common-middleware";
import {check} from 'express-validator';
import { Item } from "../../model/item.model";
import {Item2} from "../model/server-side.model";
import {convert} from "../../service/conversion-item.service";
import {getAllItemsInView} from "../../service/item.service";
import {ROLE_VIEW} from "../../model/role.model";

const httpAction: any[] = [
   [
       check('viewId').exists().isNumeric()
   ],
   validateMiddlewareFn,
   validateJwtMiddlewareFn,
   validateUserInAnyRoleMiddlewareFn([ROLE_VIEW]),
   async(req: Request, res: Response, next: NextFunction) => {
        const viewId: number = Number(req.params.viewId);

        const allItem2s: Item2[] = await getAllItemsInView(viewId);
        const allItems: Item[] = convert(allItem2s);
        res.status(200).json(allItems);
   }
]

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/items`;
    registry.addItem('GET',p);
    router.get(p, ...httpAction);
};

export default reg;
