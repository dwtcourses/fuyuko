import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import {
    aFnAllTrue,
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles,
    vFnIsSelf
} from "./common-middleware";
import {ROLE_VIEW} from "../../model/role.model";
import { param } from "express-validator";
import {getAllFavouriteItemsInView, getAllFavouriteItemsInViewCount} from "../../service/item.service";
import {toLimitOffset} from "../../util/utils";
import {LimitOffset} from "../../model/limit-offset.model";
import {Item} from "../../model/item.model";
import {PaginableApiResponse} from "../../model/api-response.model";

const httpAction:  any[] = [
        [
            param(`userId`).exists().isNumeric(),
            param(`viewId`).exists().isNumeric(),
        ],
        validateMiddlewareFn,
        validateJwtMiddlewareFn,
        (req: Request, res: Response, next: NextFunction) => {
            const userId: number = Number(req.params.userId);
            const fn =  v([
                vFnHasAnyUserRoles([ROLE_VIEW]),
                vFnIsSelf(userId)
            ], aFnAllTrue);
            return fn(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
            const userId: number = Number(req.params.userId);
            const viewId: number = Number(req.params.viewId);
            const limitOffset: LimitOffset = toLimitOffset(req);

            const items: Item[] = await getAllFavouriteItemsInView(viewId, userId, limitOffset);
            const total: number = await getAllFavouriteItemsInViewCount(viewId, userId);

            res.status(200).json({
               status: "SUCCESS",
               message: 'Favourite item retrieved',
               payload: items,
               total,
               limit: limitOffset ? limitOffset.limit : total,
               offset: limitOffset ? limitOffset.offset : 0,
            } as PaginableApiResponse<Item[]>)
        }
];


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/user/:userId/favourite-items`;
    registry.addItem(`GET`, p);
    router.get(p, ...httpAction);
};


export default reg;