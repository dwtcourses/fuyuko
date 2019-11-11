import {AttributeType} from './attribute.model';
import {ItemValTypes} from './item.model';
import {OperatorType} from './operator.model';

export interface Rule {
  id: number;
  name: string;
  enabled: boolean;
  description: string;
  validateClauses: ValidateClause[];
  whenClauses: WhenClause[];
}

export interface ValidateClause {
  id: number;
  attributeId: number;
  attributeName: string;
  attributeType: AttributeType;
  operator: OperatorType;
  condition: ItemValTypes;
}

export interface WhenClause {
  id: number;
  attributeId: number;
  attributeName: string;
  attributeType: AttributeType;
  operator: OperatorType;
  condition: ItemValTypes;
}