import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AREA_UNITS, COUNTRY_CURRENCY_UNITS, DIMENSTION_UNITS, HEIGHT_UNITS, LENGTH_UNITS, VOLUME_UNITS, WIDTH_UNITS } from '../../model/unit.model';
import { setItemAreaValue, setItemCurrencyValue, setItemDateValue, setItemDimensionValue, setItemDoubleSelectValue, setItemHeightValue, setItemLengthValue, setItemNumberValue, setItemSelectValue, setItemStringValue, setItemTextValue, setItemVolumeValue, setItemWidthValue } from '../../shared-utils/ui-item-value-setter.util';
import { doubleSelectToObjectMap } from '../../utils/doubleselect-helper.util';
let DataEditorDialogComponent = class DataEditorDialogComponent {
    constructor(formBuilder, matDialogRef, data) {
        this.formBuilder = formBuilder;
        this.matDialogRef = matDialogRef;
        this.data = data;
        this.currencyUnits = COUNTRY_CURRENCY_UNITS;
        this.areaUnits = AREA_UNITS;
        this.volumeUnits = VOLUME_UNITS;
        this.dimensionUnits = DIMENSTION_UNITS;
        this.widthUnits = WIDTH_UNITS;
        this.lengthUnits = LENGTH_UNITS;
        this.heightUnits = HEIGHT_UNITS;
        this.formControlStringAttributeValue = formBuilder.control('');
        this.formGroupStringAttribute = formBuilder.group({
            value: this.formControlStringAttributeValue
        });
        this.formControlTextAttributeValue = formBuilder.control('');
        this.formGroupTextAttribute = formBuilder.group({
            value: this.formControlTextAttributeValue
        });
        this.formControlNumberAttributeValue = formBuilder.control('');
        this.formGroupNumberAttribute = formBuilder.group({
            value: this.formControlNumberAttributeValue
        });
        this.formControlDateAttributeValue = formBuilder.control('');
        this.formGroupDateAttribute = formBuilder.group({
            value: this.formControlDateAttributeValue,
        });
        this.formControlCurrencyAttributeValue = formBuilder.control('');
        this.formControlCurrencyAttributeCountry = formBuilder.control('');
        this.formGroupCurrencyAttribute = formBuilder.group({
            value: this.formControlCurrencyAttributeValue,
            country: this.formControlCurrencyAttributeCountry
        });
        this.formControlAreaAttributeValue = formBuilder.control('');
        this.formControlAreaAttributeUnit = formBuilder.control('');
        this.formGroupAreaAttribute = formBuilder.group({
            value: this.formControlAreaAttributeValue,
            unit: this.formControlAreaAttributeUnit
        });
        this.formControlVolumeAttributeValue = formBuilder.control('');
        this.formControlVolumeAttributeUnit = formBuilder.control('');
        this.formGroupVolumeAttribute = formBuilder.group({
            value: this.formControlVolumeAttributeValue,
            unit: this.formControlVolumeAttributeUnit
        });
        this.formControlDimensionAttributeWidthValue = formBuilder.control('');
        this.formControlDimensionAttributeHeightValue = formBuilder.control('');
        this.formControlDimensionAttributeLengthValue = formBuilder.control('');
        this.formControlDimensionAttributeUnit = formBuilder.control('');
        this.formGroupDimensionAttribute = formBuilder.group({
            unit: this.formControlDimensionAttributeUnit,
            width: this.formControlDimensionAttributeWidthValue,
            height: this.formControlDimensionAttributeHeightValue,
            length: this.formControlDimensionAttributeLengthValue
        });
        this.formControlWidthAttributeValue = formBuilder.control('');
        this.formControlWidthAttributeUnit = formBuilder.control('');
        this.formGroupWidthAttribtue = formBuilder.group({
            value: this.formControlWidthAttributeValue,
            unit: this.formControlWidthAttributeUnit
        });
        this.formControlHeightAttributeValue = formBuilder.control('');
        this.formControlHeightAttributeUnit = formBuilder.control('');
        this.formGroupHeightAttribute = formBuilder.group({
            value: this.formControlHeightAttributeValue,
            unit: this.formControlHeightAttributeUnit
        });
        this.formControlLengthAttributeValue = formBuilder.control('');
        this.formControlLengthAttribtueUnit = formBuilder.control('');
        this.formGroupLengthAttribute = formBuilder.group({
            value: this.formControlLengthAttributeValue,
            unit: this.formControlLengthAttribtueUnit
        });
        this.formControlSelectAttributeKey = formBuilder.control('');
        this.formGroupSelectAttribute = formBuilder.group({
            key: this.formControlSelectAttributeKey
        });
        this.formControlDoubleSelectKey1 = formBuilder.control('');
        this.formControlDoubleSelectKey2 = formBuilder.control('');
        this.formGroupDoubleSelectAttribute = formBuilder.group({
            key1: this.formControlDoubleSelectKey1,
            key2: this.formControlDoubleSelectKey2
        });
        const attanditem = data;
        const attribute = attanditem.attribute;
        const itemValue = attanditem.itemValue ? attanditem.itemValue : { attributeId: attribute.id, val: undefined };
        switch (data.attribute.type) {
            case 'string':
                let stringVal = itemValue.val;
                if (!stringVal) {
                    stringVal = { type: 'string', value: '' };
                    itemValue.val = stringVal;
                }
                this.formControlStringAttributeValue.setValue(stringVal.value);
                break;
            case 'text':
                let textVal = itemValue.val;
                if (!textVal) {
                    textVal = { type: 'text', value: '' };
                    itemValue.val = textVal;
                }
                this.formControlTextAttributeValue.setValue(textVal.value);
                break;
            case 'number':
                let numberVal = itemValue.val;
                if (!numberVal) {
                    numberVal = { type: 'number', value: undefined };
                    itemValue.val = numberVal;
                }
                this.formControlNumberAttributeValue.setValue(numberVal.value);
                break;
            case 'date':
                let dateVal = itemValue.val;
                if (!dateVal) {
                    dateVal = { type: 'date', value: undefined };
                    itemValue.val = dateVal;
                }
                this.formControlDateAttributeValue.setValue(dateVal.value);
                break;
            case 'currency':
                let currencyVal = itemValue.val;
                if (!currencyVal) {
                    currencyVal = { type: 'currency', country: undefined, value: undefined };
                    itemValue.val = currencyVal;
                }
                this.formControlCurrencyAttributeValue.setValue(currencyVal.value);
                this.formControlCurrencyAttributeCountry.setValue(currencyVal.country);
                break;
            case 'volume':
                let volumeVal = itemValue.val;
                if (!volumeVal) {
                    volumeVal = { type: 'volume', value: undefined, unit: undefined };
                    itemValue.val = volumeVal;
                }
                this.formControlVolumeAttributeValue.setValue(volumeVal.value);
                this.formControlVolumeAttributeUnit.setValue(volumeVal.unit);
                break;
            case 'dimension':
                let dimensionVal = itemValue.val;
                if (!dimensionVal) {
                    dimensionVal = { type: 'dimension', length: undefined, width: undefined, height: undefined, unit: undefined };
                    itemValue.val = dimensionVal;
                }
                this.formControlDimensionAttributeWidthValue.setValue(dimensionVal.width);
                this.formControlDimensionAttributeHeightValue.setValue(dimensionVal.height);
                this.formControlLengthAttributeValue.setValue(dimensionVal.length);
                this.formControlDimensionAttributeUnit.setValue(dimensionVal.unit);
                break;
            case 'area':
                let areaVal = itemValue.val;
                if (!areaVal) {
                    areaVal = { type: 'area', value: undefined, unit: undefined };
                    itemValue.val = areaVal;
                }
                this.formControlAreaAttributeValue.setValue(areaVal.value);
                this.formControlAreaAttributeUnit.setValue(areaVal.unit);
                break;
            case 'width':
                let widthVal = itemValue.val;
                if (!widthVal) {
                    widthVal = { type: 'width', value: undefined, unit: undefined };
                    itemValue.val = widthVal;
                }
                this.formControlWidthAttributeValue.setValue(widthVal.value);
                this.formControlWidthAttributeUnit.setValue(widthVal.unit);
                break;
            case 'length':
                let lengthVal = itemValue.val;
                if (!lengthVal) {
                    lengthVal = { type: 'length', value: undefined, unit: undefined };
                    itemValue.val = lengthVal;
                }
                this.formControlLengthAttributeValue.setValue(lengthVal.value);
                this.formControlLengthAttribtueUnit.setValue(lengthVal.unit);
                break;
            case 'height':
                let heightVal = itemValue.val;
                if (!heightVal) {
                    heightVal = { type: 'height', value: undefined, unit: undefined };
                    itemValue.val = heightVal;
                }
                this.formControlHeightAttributeValue.setValue(heightVal.value);
                this.formControlHeightAttributeUnit.setValue(heightVal.unit);
                break;
            case 'select':
                let selectVal = itemValue.val;
                if (!selectVal) {
                    selectVal = { type: 'select', key: undefined };
                    itemValue.val = selectVal;
                }
                this.formControlSelectAttributeKey.setValue(selectVal.key);
                break;
            case 'doubleselect':
                let doubleSelectVal = itemValue.val;
                if (!doubleSelectVal) {
                    doubleSelectVal = { type: 'doubleselect', key1: undefined, key2: undefined };
                    itemValue.val = doubleSelectVal;
                }
                this.formControlDoubleSelectKey1.setValue(doubleSelectVal.key1);
                this.formControlDoubleSelectKey2.setValue(doubleSelectVal.key2);
                break;
        }
        if (data.attribute.type === 'doubleselect') {
            this.pair2Map = doubleSelectToObjectMap(data.attribute);
        }
    }
    onEditDone() {
        const attanditem = this.data;
        const attribute = attanditem.attribute;
        const value = attanditem.itemValue;
        switch (attanditem.attribute.type) {
            case 'string':
                setItemStringValue(attribute, value, this.formControlStringAttributeValue.value);
                break;
            case 'text':
                setItemTextValue(attribute, value, this.formControlTextAttributeValue.value);
                break;
            case 'number':
                setItemNumberValue(attribute, value, this.formControlNumberAttributeValue.value);
                break;
            case 'date':
                setItemDateValue(attribute, value, this.formControlDateAttributeValue.value);
                break;
            case 'currency':
                setItemCurrencyValue(attribute, value, this.formControlCurrencyAttributeValue.value, this.formControlCurrencyAttributeCountry.value);
                break;
            case 'volume':
                setItemVolumeValue(attribute, value, this.formControlVolumeAttributeValue.value, this.formControlVolumeAttributeUnit.value);
                break;
            case 'dimension':
                setItemDimensionValue(attribute, value, this.formControlDimensionAttributeWidthValue.value, this.formControlDimensionAttributeLengthValue.value, this.formControlDimensionAttributeHeightValue.value, this.formControlDimensionAttributeUnit.value);
                break;
            case 'area':
                setItemAreaValue(attribute, value, this.formControlAreaAttributeValue.value, this.formControlAreaAttributeUnit.value);
                break;
            case 'width':
                setItemWidthValue(attribute, value, this.formControlWidthAttributeValue.value, this.formControlWidthAttributeUnit.value);
                break;
            case 'length':
                setItemLengthValue(attribute, value, this.formControlLengthAttributeValue.value, this.formControlLengthAttribtueUnit.value);
                break;
            case 'height':
                setItemHeightValue(attribute, value, this.formControlHeightAttributeValue.value, this.formControlHeightAttributeUnit.value);
                break;
            case 'select':
                setItemSelectValue(attribute, value, this.formControlSelectAttributeKey.value);
                break;
            case 'doubleselect':
                setItemDoubleSelectValue(attribute, value, this.formControlDoubleSelectKey1.value, this.formControlDoubleSelectKey2.value);
                break;
        }
        this.matDialogRef.close(attanditem);
    }
    onEditCancel($event) {
        this.matDialogRef.close(null);
    }
    onDoubleSelectPair1Change($event) {
        const pair1Key = $event.source.value;
        this.pairs2 = this.pair2Map[pair1Key];
    }
};
DataEditorDialogComponent = tslib_1.__decorate([
    Component({
        templateUrl: './data-editor-dialog.component.html',
        styleUrls: ['./data-editor-dialog.component.scss']
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        MatDialogRef, Object])
], DataEditorDialogComponent);
export { DataEditorDialogComponent };
//# sourceMappingURL=data-editor-dialog.component.js.map