import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";

const EditMembership = () => {
  const { id } = useParams(); // Extracting the membership ID from the URL parameters
  const [name, setName] = useState(""); // State to store the membership name
  const [point, setPoint] = useState(""); // State to store the membership point
  const [telephone, setTelephone] = useState(""); // State to store the membership telephone number
  const navigate = useNavigate(); // Using useNavigate for navigation

  // get membership details from the server when the component mounts
  useEffect(() => {
    getMembership();
  }, []);

  // Function to get membership details from the server
  const getMembership = async () => {
    try {
      // Send a GET request to get membership details based on the ID
      const response = await axios.get(
        `http://localhost:3000/membership/${id}`
      );
      // Extract membership details from the response and update the state
      const membership = response.data;
      setName(membership.name);
      setPoint(membership.point);
      setTelephone(membership.telephone);
    } catch (error) {
      console.error("There was an error geting the membership!", error);
    }
  };

  // Function to handle membership update
  const updateMembership = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a PUT request to update the membership details
      await axios.put(`http://localhost:3000/membership/${id}`, {
        name,
        point,
        telephone,
      });
      // Navigate to the membership list page after successful update
      navigate("/membership");
    } catch (error) {
      console.error("There was an error updating the membership!", error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Edit Membership</h1>
        <form onSubmit={updateMembership}>
          {/* Input field for membership name */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Input field for membership point */}
          <div className="field">
            <label className="label">Point</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Input field for membership telephone number */}
          <div className="field">
            <label className="label">Telephone</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Button to submit the form and update membership details */}
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditMembership;
