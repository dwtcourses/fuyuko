import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response } from "express";
import { param } from "express-validator";
import {validateJwtMiddlewareFn, validateMiddlewareFn} from "./common-middleware";
import {getItemsByIds} from "../../service/item.service";
import {Item} from "../../model/item.model";
import {Item2} from "../model/server-side.model";
import {convert} from "../../service/conversion-item.service";

const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        param('itemIds').exists()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    async (req: Request, res: Response, next: NextFunction) => {
        const viewId: number = Number(req.params.viewId);
        const itemIds: number[] = req.params.itemIds.split(',').map((i: string) => Number(i));

        const item2s: Item2[] = await getItemsByIds(viewId, itemIds);
        const items: Item[] = convert(item2s);

        res.status(200).json(items);
    }
]

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/items/:itemIds`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;