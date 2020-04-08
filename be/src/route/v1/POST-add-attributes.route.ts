import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {param, body} from 'express-validator';
import {revert} from "../../service/conversion-attribute.service";
import {Attribute2} from "../model/server-side.model";
import {ApiResponse} from "../../model/api-response.model";
import {saveAttribute2s} from "../../service/attribute.service";
import {ROLE_EDIT} from "../../model/role.model";
import {newConsoleLogger} from "../../service/job-log.service";

const httpAction: any[] = [
    [
       param('viewId').exists().isNumeric(),
       body('attributes').isArray(),
       body('attributes.*.type').exists(),
       body('attributes.*.name').exists(),
       body('attributes.*.description').exists(),
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_EDIT])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {


        const viewId: number = Number(req.params.viewId);
        const attrs2: Attribute2[] = revert(req.body.attributes);

        await saveAttribute2s(viewId, attrs2, newConsoleLogger);

        res.status(200).json({
            status: 'SUCCESS',
            message: `Attributes added`
        } as ApiResponse);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p1 = `/view/:viewId/attributes/add`;
    registry.addItem('POST', p1);
    router.post(p1, ...httpAction);
}

export default reg;
