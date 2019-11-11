import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemAndAttributeSet, ItemValueAndAttribute} from '../../model/item-attribute.model';
import {ItemSearchComponentEvent, SearchType} from '../item-search-component/item-search.component';
import {Item} from '../../model/item.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ItemDataEditorDialogComponent} from '../data-thumbnail-component/item-data-editor-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {ItemEditorComponentEvent} from '../data-editor-component/item-editor.component';
import {createNewItem} from '../../utils/ui-item-value-creator.utils';

export interface DataListComponentEvent {
    type: 'modification' | 'reload';
    modifiedItems: Item[]; // only available when type is modification
    deletedItems: Item[];  // only available when type is modification
}

export interface DataListSearchComponentEvent {
    type: SearchType;
    search: string;
}


@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent {
    counter: number;

    @Input() itemAndAttributeSet: ItemAndAttributeSet;

    @Output() events: EventEmitter<DataListComponentEvent>;
    @Output() searchEvents: EventEmitter<DataListSearchComponentEvent>;

    pendingSaving: Item[];
    pendingDeletion: Item[];
    selectionModel: SelectionModel<Item>;

    constructor(private matDialog: MatDialog) {
        this.counter = 0;
        this.selectionModel = new SelectionModel(true);
        this.pendingSaving = [];
        this.pendingDeletion = [];
        this.events = new EventEmitter();
        this.searchEvents = new EventEmitter();
    }

    onItemSearchEvent($event: ItemSearchComponentEvent) {
        this.searchEvents.emit($event);
    }

    save($event: MouseEvent) {
        this.events.emit({
            type: 'modification',
            deletedItems: [...this.pendingDeletion],
            modifiedItems: [...this.pendingSaving]
        } as DataListComponentEvent);
        this.pendingDeletion = [];
        this.pendingSaving = [];
    }

    delete($event: MouseEvent) {
        const i: Item[] = this.selectionModel.selected;
        this.pendingDeletion.push(...this.selectionModel.selected);
        this.selectionModel.selected.forEach((selectedItem: Item) => {
            const index = this.itemAndAttributeSet.items.findIndex((tmpI: Item) => tmpI.id === selectedItem.id);
            if (index !== -1) {
                this.itemAndAttributeSet.items.splice(index, 1);
            }
        });
        this.selectionModel.clear();
    }

    addItem($event: MouseEvent) {
        const id =  --this.counter;
        const item: Item = createNewItem(id, this.itemAndAttributeSet.attributes);
        this.matDialog.open(ItemDataEditorDialogComponent, {
            data: {
                attributes: this.itemAndAttributeSet.attributes,
                item
            }
        }).afterClosed()
            .pipe(
                map((r: Item) => {
                    if (r) {
                        this.pendingSaving.push(r);
                        this.itemAndAttributeSet.items.unshift(r);
                    }
                })
            ).subscribe();
    }


    reload($event: MouseEvent) {
        this.events.emit({ type: 'reload'} as DataListComponentEvent);
    }

    canSave(): boolean {
        return ((this.pendingSaving.length !== 0) || (this.pendingDeletion.length !== 0));
    }

    canDelete(): boolean {
        return (this.selectionModel.selected && this.selectionModel.selected.length > 0);
    }

    onItemDataChange($event: ItemEditorComponentEvent) {
       const item: Item = this.itemAndAttributeSet.items.find((i: Item) => i.id === $event.item.id);
       const index = this.pendingSaving.findIndex((i: Item) => i.id === $event.item.id);
       if (index === -1) {
           this.pendingSaving.push(item);
       }
       switch ($event.type) {
           case 'name':
               item.name = $event.item.name;
               break;
           case 'description':
               item.description = $event.item.description;
               break;
       }
    }

    onAttributeDataChange($event: ItemValueAndAttribute, item: Item) {
        const i: Item = this.pendingSaving.find((tmpI: Item) => tmpI.id === item.id);
        if (!i) {
            this.pendingSaving.push({
                id: item.id,
                [$event.attribute.id]: $event.itemValue
            } as Item);
        } else {
            i[$event.attribute.id] = $event.itemValue;
        }
        const i2: Item = this.itemAndAttributeSet.items.find((tmpI: Item) => tmpI.id === item.id);
        if (i) {
            i[$event.attribute.id] = $event.itemValue;
        }
    }

    onCheckboxStateChange($event: MatCheckboxChange, item: Item) {
        if ($event.checked) {
            this.selectionModel.select(item);
        } else {
            this.selectionModel.deselect(item);
        }
        return false;
    }
}