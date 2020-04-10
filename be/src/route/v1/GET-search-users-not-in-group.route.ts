import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check, param} from 'express-validator';
import {doInDbConnection, QueryA, QueryI} from "../../db";
import {Connection} from "mariadb";
import {Group} from "../../model/group.model";
import {Role, ROLE_VIEW} from "../../model/role.model";
import {User} from "../../model/user.model";
import {ApiResponse} from "../../model/api-response.model";

// CHECKED

const httpAction: any[] = [
    [
        param('groupId').exists().isNumeric(),
        param('username')
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {
        const u: User[] = await doInDbConnection(async (conn: Connection) => {

            const groupId: number = Number(req.params.groupId);
            const username: string = req.params.username;

            const q: QueryA = await conn.query(`
                SELECT 
                    U.ID AS U_ID,
                    U.USERNAME AS U_USERNAME,
                    U.CREATION_DATE AS U_CREATION_DATE,
                    U.LAST_UPDATE AS U_LAST_UPDATE,
                    U.EMAIL AS U_EMAIL,
                    U.FIRSTNAME AS U_FIRSTNAME,
                    U.LASTNAME AS U_LASTNAME,
                    U.STATUS AS U_STATUS,
                    U.PASSWORD AS U_PASSWORD,
                    UT.THEME AS UT_THEME,
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_USER AS U 
                LEFT JOIN TBL_LOOKUP_USER_GROUP AS LUG ON LUG.USER_ID = U.ID 
                LEFT JOIN TBL_USER_THEME AS UT ON UT.USER_ID = U.ID
                LEFT JOIN TBL_GROUP AS G ON G.ID = LUG.GROUP_ID
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE U.STATUS = 'ENABLED' AND G.STATUS = 'ENABLED'
                AND U.ID NOT IN (
                    SELECT 
                        U.ID
                    FROM TBL_USER AS U 
                    LEFT JOIN TBL_LOOKUP_USER_GROUP AS LUG ON LUG.USER_ID = U.ID
                    LEFT JOIN TBL_GROUP AS G ON G.ID = LUG.GROUP_ID
                    WHERE G.ID = ? 
                ) AND U.USERNAME LIKE ?
            `, [groupId, `%${username ? username : ''}%`]);


            const u: Map<number/*user id*/, User> = new Map();
            const g: Map<string/*<user id>_<group id>*/, Group> = new Map();
            const r: Map<string/*<user id>_<group id>_<role id>*/, Role> = new Map();


            return q.reduce((acc: User[], i: QueryI, index: number) => {
                const userId = i.U_ID;
                const uKey = `${userId}`;
                if (!u.has(userId)) {
                    const user: User = ({
                        id: i.U_ID,
                        username: i.U_USERNAME,
                        firstName: i.U_FIRSTNAME,
                        lastName: i.U_LASTNAME,
                        email: i.U_EMAIL,
                        theme: i.UT_THEME,
                        groups: []
                    } as User);
                    u.set(userId, user);
                    acc.push(user);
                }

                const groupId = i.G_ID;
                const gKey = `${userId}_${groupId}`;
                if (!g.has(gKey)) {
                    const group: Group = ({
                        id: i.G_ID,
                        name: i.G_NAME,
                        description: i.G_DESCRIPTION,
                        status: i.G_STATUS,
                        roles: []
                    });
                    g.set(gKey, group);
                    u.get(userId).groups.push(group);
                }

                const roleId = i.R_ID;
                const rKey = `${userId}_${groupId}_${roleId}`;
                if (!r.has(rKey)) {
                    const role: Role = {
                        id: i.R_ID,
                        name: i.R_NAME,
                        description: i.R_DESCRIPTION
                    } as Role;
                    r.set(rKey, role);
                        g.get(gKey).roles.push(role);
                    }

                    return acc;
                }, []
            );
        });

        res.status(200).json({
            status: 'SUCCESS',
            message: `Users retrieved`,
            payload: u
        } as ApiResponse<User[]>);
    }
]

const reg = (router: Router, registry: Registry) => {
    const p = `/users/not-in-group/:groupId/:username?`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
