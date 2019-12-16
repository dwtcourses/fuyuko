import {Registry} from "../../registry";
import {NextFunction, Request, Response, Router} from "express";
import {param, body} from "express-validator";
import {validateJwtMiddlewareFn, validateMiddlewareFn} from "./common-middleware";
import {doInDbConnection, QueryResponse} from "../../db";
import {PoolConnection} from "mariadb";
import {multipartParse} from "../../service";
import {File} from "formidable";
import * as util from "util";
import * as fs from "fs";
import fileType from "file-type";
import {ItemDataImport} from "../../model/data-import.model";
import {preview} from "../../service/import-csv/import-item.service";
import {makeApiError, makeApiErrorObj} from "../../util";

const uuid = require('uuid');
const detectCsv = require('detect-csv');


const httpAction: any[] = [
    [
        param('viewId').exists().isNumeric(),
        // body('itemDataCsvFile').exists()
    ],
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    async (req: Request, res: Response, next: NextFunction) => {
        const viewId: number = Number(req.params.viewId);
        const name: string = `item-data-import-${uuid()}`;
        const {fields, files} = await multipartParse(req);

        await doInDbConnection(async (conn: PoolConnection) => {

            const q: QueryResponse = await conn.query(`INSERT INTO TBL_DATA_IMPORT (VIEW_ID, NAME, TYPE) VALUES (?,?,'ITEM')`, [viewId, name]);
            const dataImportId: number = q.insertId;

            const itemDataCsvFile: File = files.itemDataCsvFile;

            const content: Buffer  = await util.promisify(fs.readFile)(itemDataCsvFile.path);

            let mimeType = undefined;
            if (detectCsv(content)) {
                mimeType = 'text/csv';
            } else {
                res.status(200).json(
                    makeApiErrorObj(
                        makeApiError(`Only support csv import`, `attributeDataCsvFile`, ``, `API`)
                    )
                );
                return;
            }

            await conn.query(`INSERT INTO TBL_DATA_IMPORT_FILE (DATA_IMPORT_ID, NAME, MIME_TYPE, SIZE, CONTENT) VALUES (?,?,?,?,?)`,
                [dataImportId, itemDataCsvFile.name, mimeType, content.length, content]);

            const itemDataImport: ItemDataImport = await preview(viewId, dataImportId, content);
            res.status(200).json(itemDataImport);
        });

    }
];


const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/import/items/preview`;
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
}

export default reg;