import CompanyDetail from "../../companies/components/CompanyDetail/CompanyDetail";
import { Office as OfficeType } from "../Offices/Offices";
import Card from "../../../components/UiElements/Card/Card";
import { useState } from "react";
import { LoadingSpinner } from "../../../components/UiElements/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

type Props = OfficeType & {
  deleteOneOffice: (officeId: string) => void;
};

const Office = ({
  _id,
  name,
  location,
  officeStartDate,
  deleteOneOffice,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCompany = async (officeId: string) => {
    setIsLoading(true);
    try {
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/office/${officeId}`,
        {
          method: "DELETE",
          headers: {
            // "Content-Type": "application/json",
          },
        }
      );

      const deleteResponseData = await deleteResponse.json();

      if (deleteResponse.status === 422) {
        throw new Error("Validation failed.");
      }
      if (deleteResponse.status !== 200 && deleteResponse.status !== 201) {
        throw new Error(deleteResponseData.message);
      }

      console.log(deleteResponseData);

      deleteOneOffice(officeId);
      toast.success(deleteResponseData.message);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner small />;
      </div>
    );
  }

  return (
    <Card onDelete={() => handleDeleteCompany(_id)} title={name}>
      <CompanyDetail heading="Location">
        <p>Lat: {location.latitude}</p>
        <p>Long: {location.longitude}</p>
      </CompanyDetail>
      <CompanyDetail heading="Office Start Date">
        <p>{officeStartDate}</p>
      </CompanyDetail>
    </Card>
  );
};

export default Office;
