import {param, body} from 'express-validator';
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {Registry} from "../../registry";
import {Router, Request, Response, NextFunction} from "express";
import { Item } from '../../model/item.model';
import {runJob} from "../../service/export-csv/job-do-item-data-export.service";
import {Job} from "../../model/job.model";
import {Attribute} from "../../model/attribute.model";
import {ROLE_EDIT} from "../../model/role.model";
import {ApiResponse} from "../../model/api-response.model";

// CHECKED

const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        body('attributes').exists().isArray(),
        body('items').exists().isArray()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_EDIT])], aFnAnyTrue),
    async (req:Request, res: Response, next: NextFunction) => {

        const viewId: number = Number(req.params.viewId);
        const attributes: Attribute[] = req.body.attributes;
        const item: Item[] = req.body.items;

        const job: Job = await runJob(viewId, attributes, item);
        res.status(200).json( {
            status: 'SUCCESS',
            message: `Item data export job scheduled`,
            payload: job
        } as ApiResponse<Job>);
    }
];


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/export/items`;
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
}

export default reg;
