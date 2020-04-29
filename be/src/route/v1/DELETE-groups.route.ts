import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import { body } from "express-validator";
import {aFnAnyTrue, v, validateJwtMiddlewareFn, validateMiddlewareFn, vFnHasAnyUserRoles} from "./common-middleware";
import {ROLE_ADMIN, ROLE_EDIT} from "../../model/role.model";
import {deleteGroup} from "../../service/group.service";
import {ApiResponse} from "../../model/api-response.model";


const httpAction: any[] = [
    [
        body(`groupIds`).isArray(),
        body(`groupIds.*`).isNumeric()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_ADMIN])], aFnAnyTrue),
    async(req: Request, res: Response, next: NextFunction) => {
        const groupIds: number[] = req.body.groupIds;
        const errors: string[] = await deleteGroup(groupIds);

        if (errors && errors.length) {
            res.status(400).json({
                status: 'ERROR',
                message: errors.join(', ')
            } as ApiResponse);
        }  else {
            res.status(200).json({
                status: 'SUCCESS',
                message: `Group(s) successfully deleted`
            } as ApiResponse);
        }
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/groups`;
    registry.addItem('DELETE', p);
    router.delete(p, ...httpAction);
};

export default reg;