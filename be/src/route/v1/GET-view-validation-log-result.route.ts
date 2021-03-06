import {param} from "express-validator";
import {aFnAnyTrue, v, validateJwtMiddlewareFn, validateMiddlewareFn, vFnHasAnyUserRoles} from "./common-middleware";
import {ROLE_VIEW} from "../../model/role.model";
import {NextFunction, Request, Response, Router} from "express";
import {ValidationLogResult} from "../../model/validation.model";
import {ApiResponse} from "../../model/api-response.model";
import {Registry} from "../../registry";
import {getViewValidationResultLog} from "../../service/validation/validation.service";

const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        param('validationId').exists().isNumeric(),
        param('validationLogId').optional().isNumeric(),
        param('order').optional(),
        param('limit').optional().isNumeric(),
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {

        const viewId: number = Number(req.params.viewId);
        const validationId: number = Number(req.params.validationId);
        const validationLogId: number = req.params.validationLogId ? Number(req.params.validationLogId) : null;
        const order: string = req.params.order ? req.params.order : null;
        const limit: number = req.params.limit ? Number(req.params.limit) : null;

        const _r: ValidationLogResult = await getViewValidationResultLog(viewId, validationId, validationLogId, order as any, limit);

        res.status(200).json({
            status: 'SUCCESS',
            message: `Validation log result retrieved`,
            payload: _r
        } as ApiResponse<ValidationLogResult>);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/validation/:validationId/validationLogId/:validationLogId?/order/:order?/limit/:limit?`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
