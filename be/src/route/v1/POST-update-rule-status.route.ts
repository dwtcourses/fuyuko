import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check, param} from 'express-validator';
import {doInDbConnection} from "../../db";
import {Connection} from "mariadb";
import {ApiResponse} from "../../model/api-response.model";
import {ROLE_EDIT} from "../../model/role.model";
import {updateRuleStatus} from "../../service/rule.service";
import {Status} from "../../model/status.model";

// CHECKED

const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        param('ruleId').exists().isNumeric(),
        param('status').exists()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_EDIT])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {

        const viewId: number = Number(req.params.viewId);
        const ruleId: number = Number(req.params.ruleId);
        const status: string = req.params.status;

        const r: boolean = await updateRuleStatus(ruleId, status as Status);
        if (r) {
            res.status(200).json({
                status: 'SUCCESS',
                message: `Rule Status updated`
            } as ApiResponse);
        } else {
            res.status(400).json({
                status: 'ERROR',
                message: `Rule Status Failed to be updated`
            } as ApiResponse);
        }
    }
]


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/rule/:ruleId/status/:status`;
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
}

export default reg;
