import {Registry} from "../../registry";
import {Router, Request, Response, NextFunction} from "express";
import {validateJwtMiddlewareFn, validateMiddlewareFn} from "./common-middleware";
import {param, body} from 'express-validator';
import {PricingStructureItemWithPrice} from "../../model/pricing-structure.model";
import {ApiResponse} from "../../model/response.model";
import {setPrices} from "../../service/pricing-structure-item.service";

const httpAction: any[] = [
    [
        param('pricingStructureId').exists().isNumeric(),
        body('pricingStructureItems').isArray(),
        body('pricingStructureItems.*.id').exists().isNumeric(),
        body('pricingStructureItems.*.itemId').exists().isNumeric(),
        body('pricingStructureItems.*.price').exists().isNumeric()
    ],
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    async (req: Request, res: Response, next: NextFunction) => {

        const pricingStructureId: number = Number(req.params.pricingStructureId);
        const pricingStructureItems: PricingStructureItemWithPrice[] =  req.body.pricingStructureItems;

        await setPrices(pricingStructureId, pricingStructureItems);

        res.status(200).json({
           status: "SUCCESS",
           message: `Pricing updated`
        } as ApiResponse);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/pricingStructure/:pricingStructureId/item`;
    router.post(p, ...httpAction);
}

export default reg;
