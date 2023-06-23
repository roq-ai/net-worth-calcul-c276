import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FinancialInformationInterface {
  id?: string;
  organization_id?: string;
  asset: string;
  liability: string;
  income: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface FinancialInformationGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  asset?: string;
  liability?: string;
  income?: string;
}
