import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialsModule } from '../../app-materials.module';
import { ItemSearchModule } from '../item-search-component/item-search.module';
import { DataEditorModule } from '../data-editor-component/data-editor.module';
import { DataListComponent } from './data-list.component';
import { CarouselModule } from '../carousel-component/carousel.module';
let DataListModule = class DataListModule {
};
DataListModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            AppMaterialsModule,
            DataEditorModule,
            ItemSearchModule,
            CarouselModule
        ],
        declarations: [
            DataListComponent
        ],
        exports: [
            DataListComponent
        ]
    })
], DataListModule);
export { DataListModule };
//# sourceMappingURL=data-list.module.js.map