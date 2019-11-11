import {Component, Input, OnInit} from '@angular/core';
import {Attribute} from '../../model/attribute.model';
import {Item, TableItem} from '../../model/item.model';
import {toTableItem} from '../../utils/item-to-table-items.util';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {RowInfo} from './data-table.component';


class ViewOnlyDataTableDatasource implements DataSource<TableItem> {

    private subject: BehaviorSubject<TableItem[]>;

    constructor() {
        this.subject = new BehaviorSubject([]);
    }

    connect(collectionViewer: CollectionViewer): Observable<TableItem[] | ReadonlyArray<TableItem>> {
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
    }

    update(tableItems: TableItem[]) {
        this.subject.next(tableItems);
    }

}

@Component({
    selector: 'app-view-only-data-table',
    templateUrl: './view-only-data-table.component.html',
    styleUrls: ['./view-only-data-table.component.scss']
})
export class ViewOnlyDataTableComponent implements OnInit {

    @Input() attributes: Attribute[];
    @Input() items: Item[];

    tableItems: TableItem[];
    datasource: ViewOnlyDataTableDatasource;
    displayColumns: string[];
    rowInfoMap: Map<number, RowInfo>;   // item id as key


    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.rowInfoMap = new Map();
        this.datasource = new ViewOnlyDataTableDatasource();
        this.displayColumns = ['expansion', 'name', 'description'].concat(...this.attributes.map((a: Attribute) => ('' + a.id)));
        this.tableItems = toTableItem(this.items);
        this.tableItems.forEach((t: TableItem) => {
            this.rowInfoMap.set(t.id, {
                tableItem: t,
                expanded: false,
            } as RowInfo);
        });
        this.datasource.update(this.tableItems);
    }

    isChildRow(index: number, item: TableItem): boolean {
        return !!item.parentId;
    }

    isAnyParentRowExpanded(item: TableItem) {
        const b = this.rowInfoMap.get(item.rootParentId);
        return b.expanded;
    }

    rowClicked(item: TableItem) {
        if (!this.rowInfoMap.has(item.id)) {
            this.rowInfoMap.set(item.id, { expanded: false } as RowInfo);
        }
        this.rowInfoMap.get(item.id).expanded = !this.rowInfoMap.get(item.id).expanded;
    }

    isRowExpanded(item: TableItem): boolean {
        if (!this.rowInfoMap.has(item.id)) {
            this.rowInfoMap.set(item.id, { expanded: false } as RowInfo);
        }
        return this.rowInfoMap.get(item.id).expanded;
    }
}
