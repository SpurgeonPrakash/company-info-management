import React, { useCallback, useEffect, useState } from "react";
import CompanyContext, { Company } from "./CompanyContext";
import { toast } from "react-toastify";

interface CompanyProviderType {
  children: React.ReactNode;
}

const CompanyProvider = ({ children }: CompanyProviderType) => {
  const [companies, addCompanies] = useState<Company[]>([]);
  const [isCompaniesLoading, setIsCompaniesLoading] = useState<boolean>(false);

  const setIsCompLoading = (loadingState: boolean) => {
    setIsCompaniesLoading(loadingState);
  };

  const setCompanies = (companyList: Company[]) => {
    addCompanies(companyList);
  };

  const addOneCompany = (newCompany: Company) => {
    addCompanies((prev) => {
      return [...prev, newCompany];
    });
  };

  const deleteOneCompany = (companyId: string) => {
    console.log(companyId);

    addCompanies((prevCompanies) => {
      return prevCompanies.filter((comp) => comp._id !== companyId);
    });
  };

  const fetchCompanies = useCallback(async () => {
    setIsCompLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/company`,
        {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );

      const respData = await resp.json();
      if (resp.status === 422) {
        throw new Error("Validation failed.");
      }
      if (resp.status !== 200 && resp.status !== 201) {
        throw new Error("Something Went Wrong");
      }

      setCompanies(respData.companies);

      // console.log(companies);
      console.log(respData.companies);

      setIsCompLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsCompLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const contextValue = {
    companies,
    setCompanies,
    addOneCompany,
    isCompaniesLoading,
    setIsCompLoading,
    deleteOneCompany,
  };
  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
