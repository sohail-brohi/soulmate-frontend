import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Profiles = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [profiles, setProfiles] = useState([]);

  // Extracting individual query parameters
  const ageForm = queryParams.get("ageForm");
  const ageTo = queryParams.get("ageto");
  const city = queryParams.get("city");
  const gender = queryParams.get("gender");
  const religion = queryParams.get("religion");

  const fetchApi = async () => {
    const result = await axios.post("http://localhost:3001/profiles", {
      agefrom: ageForm,
      ageto: ageTo,
      city: city,
      gender: gender,
      religion: religion,
    });
    const data = result.data;
    setProfiles(data);
  };
  useEffect(() => {
    fetchApi();
  }, [queryParams]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="showData-container">
        <h3 className="heading-container">Matched Profiles</h3>
        {profiles && profiles?.length === 0 ? (
          <div>No profiles found matching the criteria.</div>
        ) : (
          profiles &&
          profiles?.map((profile) => (
            <div key={profile._id} className="profile-card">
              <div> Name: {profile.name}</div>
              <div>Father's Name: {profile.fatherName}</div>
              <div> Age: {profile.age}</div>
              <div> City: {profile.city}</div>
              <div>Siblings: {profile.sibling}</div>
              <div> Phone Number: {profile.phoneNo}</div>
              <div> Gender: {profile.gender}</div>
              <div> Religion: {profile.religion}</div>
              <div> Cast {profile.cast}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Profiles;
