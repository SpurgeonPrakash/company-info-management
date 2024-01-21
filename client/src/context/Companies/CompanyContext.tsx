import { createContext, useContext } from "react";

export type Company = {
  _id: string;
  name: string;
  address: string;
  revenue: number;
  phone: {
    countryCode: string;
    number: string;
  };
};

export interface CompanyContextTypes {
  companies: Company[];
  setCompanies: (companyList: Company[]) => void;
  addOneCompany: (company: Company) => void;
  isCompaniesLoading: boolean;
  setIsCompLoading: (loadinghState: boolean) => void;
  deleteOneCompany: (companyId: string) => void;
}

const CompanyContext = createContext<CompanyContextTypes>(
  {} as CompanyContextTypes
);

export const useCompanyContext = () => {
  const {
    companies,
    setCompanies,
    addOneCompany,
    isCompaniesLoading,
    setIsCompLoading,
    deleteOneCompany,
  } = useContext(CompanyContext);

  return {
    companies,
    setCompanies,
    addOneCompany,
    isCompaniesLoading,
    setIsCompLoading,
    deleteOneCompany,
  };
};

export default CompanyContext;
