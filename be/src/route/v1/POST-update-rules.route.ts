import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import {
    aFnAnyTrue,
    v,
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    vFnHasAnyUserRoles
} from "./common-middleware";
import {check, body} from 'express-validator';
import {doInDbConnection, QueryResponse} from "../../db";
import {Connection} from "mariadb";
import {Rule} from "../../model/rule.model";
import {Rule2} from "../model/server-side.model";
import {ApiResponse} from "../../model/api-response.model";
import {revert} from "../../service/conversion-rule.service";
import {ROLE_EDIT} from "../../model/role.model";

const httpAction: any[] = [
    [
        check('viewId').exists().isNumeric(),
        body('rules').isArray(),
        body('rules.*.name').exists(),
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_EDIT])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {

        const viewId: number = Number(req.params.viewId);
        const rules: Rule[] = req.body.rules;
        const rule2s: Rule2[] = revert(rules);
        
        for (const rule2 of rule2s) {
            if (rule2.id && rule2.id > 0)  { // update
                doInDbConnection((conn: Connection) => {
                    update(conn, viewId, rule2)
                });
            } else { // add
                doInDbConnection((conn: Connection) => {
                    add(conn, viewId, rule2)
                });
            }
        }

        res.status(200).json({
            status: 'SUCCESS',
            message: `Update successful`
        } as ApiResponse);
    }
];

const add = async (conn: Connection, viewId: number, rule2: Rule2) => {

    await doInDbConnection(async (conn: Connection) => {
            const rq: QueryResponse = await conn.query(`INSERT INTO TBL_RULE (VIEW_ID, NAME, DESCRIPTION, STATUS) VALUES (?,?,?,'ENABLED')`, [viewId, rule2.name, rule2.description]);
            const ruleId: number = rq.insertId;

            for (const validateClause of rule2.validateClauses) {
                const rc: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE (RULE_ID, VIEW_ATTRIBUTE_ID, \`OPERATOR\`, \`CONDITION\`) VALUES (?,?,?,'')`, [ruleId, validateClause.attributeId, validateClause.operator]);
                const clauseId: number = rc.insertId;

                for (const metadata of validateClause.metadatas) {

                    const rm: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE_METADATA (RULE_VALIDATE_CLAUSE_ID, NAME) VALUES (?, '')`, [clauseId]);
                    const metaId: number = rm.insertId;

                    for (const entry of metadata.entries) {
                        await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE_METADATA_ENTRY (RULE_VALIDATE_CLAUSE_METADATA_ID, \`KEY\`, \`VALUE\`, DATA_TYPE) VALUES (?,?,?,?)`, [metaId, entry.key, entry.value, entry.dataType]);
                    }
                }
            }

            for (const whenClause of rule2.whenClauses) {
                const rc: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE (RULE_ID, VIEW_ATTRIBUTE_ID, \`OPERATOR\`, \`CONDITION\`) VALUES (?,?,?,'')`, [ruleId, whenClause.attributeId, whenClause.operator]);
                const clauseId: number = rc.insertId;

                for (const metadata of whenClause.metadatas) {

                    const rm: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE_METADATA (RULE_WHEN_CLAUSE_ID, NAME) VALUES (?, '')`, [clauseId]);
                    const metaId: number = rm.insertId;

                    for (const entry of metadata.entries) {
                        await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE_METADATA_ENTRY (RULE_WHEN_CLAUSE_METADATA_ID, \`KEY\`, \`VALUE\`, DATA_TYPE) VALUES (?,?,?,?)`, [metaId, entry.key, entry.value, entry.dataType]);
                    }
                }
            }
    });
};

const update = async (conn: Connection, viewId: number, rule2: Rule2) => {
    await doInDbConnection(async (conn: Connection) => {

        const ruleId: number = rule2.id;
        await conn.query(`UPDATE TBL_RULE SET NAME=?, DESCRIPTION=? WHERE ID=?`, [rule2.name, rule2.description, ruleId]);

        await conn.query(`DELETE FROM TBL_RULE_VALIDATE_CLAUSE WHERE RULE_ID=?`, [ruleId]);

        for (const validateClause of rule2.validateClauses) {

            const rc: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE (RULE_ID, VIEW_ATTRIBUTE_ID, \`OPERATOR\`, \`CONDITION\`) VALUES (?,?,?,'')`, [ruleId, validateClause.attributeId, validateClause.operator]);
            const clauseId: number = rc.insertId;

            for (const metadata of validateClause.metadatas) {

                const rm: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE_METADATA (RULE_VALIDATE_CLAUSE_ID, NAME) VALUES (?, '')`, [clauseId]);
                const metaId: number = rm.insertId;

                for (const entry of metadata.entries) {
                    await conn.query(`INSERT INTO TBL_RULE_VALIDATE_CLAUSE_METADATA_ENTRY (RULE_VALIDATE_CLAUSE_METADATA_ID, \`KEY\`, \`VALUE\`, DATA_TYPE) VALUES (?,?,?,?)`, [metaId, entry.key, entry.value, entry.dataType]);
                }
            }
        }

        await conn.query(`DELETE FROM TBL_RULE_WHEN_CLAUSE WHERE RULE_ID=?`, [ruleId]);

        for (const whenClause of rule2.whenClauses) {
            const rc: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE (RULE_ID, VIEW_ATTRIBUTE_ID, \`OPERATOR\`, \`CONDITION\`) VALUES (?,?,?,'')`, [ruleId, whenClause.attributeId, whenClause.operator]);
            const clauseId: number = rc.insertId;

            for (const metadata of whenClause.metadatas) {

                const rm: QueryResponse = await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE_METADATA (RULE_WHEN_CLAUSE_ID, NAME) VALUES (?, '')`, [clauseId]);
                const metaId: number = rm.insertId;

                for (const entry of metadata.entries) {
                    await conn.query(`INSERT INTO TBL_RULE_WHEN_CLAUSE_METADATA_ENTRY (RULE_WHEN_CLAUSE_METADATA_ID, \`KEY\`, \`VALUE\`, DATA_TYPE) VALUES (?,?,?,?)`, [metaId, entry.key, entry.value, entry.dataType]);
                }
            }
        }
    });
};


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/rules`;
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
};

export default reg;
