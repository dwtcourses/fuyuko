import {PricedItem2} from "../../route/model/server-side.model";
import {Attribute} from "../../model/attribute.model";
import {doInDbConnection} from "../../db";
import {Connection} from "mariadb";
import {getPricedItem2WithFiltering} from "../priced-item-filtering.service";
import {PricedItem} from "../../model/item.model";
import {convert} from "../conversion-item.service";
import {ItemValueOperatorAndAttribute} from "../../model/item-attribute.model";
import {PricingStructure} from "../../model/pricing-structure.model";
import {getPricingStructureById} from "../pricing-struture.service";

export type PreviewResult = { i: PricedItem[], m: Map<string /* attributeId */, Attribute>};

export const preview = async (viewId: number, pricingStructureId: number, filter: ItemValueOperatorAndAttribute[]): Promise<PreviewResult> => {
    const {b: item2s, m: attributesMap}: {b: PricedItem2[], m: Map<string /* attributeId */, Attribute> } = await doInDbConnection(async (conn: Connection) => {
        return await getPricedItem2WithFiltering(conn, viewId, pricingStructureId, null, filter);
    });

    const items: PricedItem[] = convert(item2s) as PricedItem[];

    return {
       i: items,
       m: attributesMap
    } as PreviewResult;
}
