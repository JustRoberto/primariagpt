import DocumentPortfolio from "../components/DocumentPortfolio";
import UserDetails from "../components/UserDetails";
import { useState } from "react";

const DocumentPortfolioPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    placeOfBirth: "",
    address: "",
    socialSecurityNumber: "",
    maritalStatus: "",
    // Add more fields as needed
  });

  const handleUpdateUserDetails = (newUserDetails) => {
    setUserDetails(newUserDetails);
  };

  return (
    <div>
      <h1>Document Portfolio</h1>
      {/* Your document portfolio component and logic go here */}
      <DocumentPortfolio userDetails={userDetails} onUpdateUserDetails={handleUpdateUserDetails} />
      <UserDetails
        userDetails={userDetails}
        onUpdateUserDetails={handleUpdateUserDetails}
      />
    </div>
  );
};

export default DocumentPortfolioPage;
