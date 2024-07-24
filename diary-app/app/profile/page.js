// app/profile/page.js
"use client"; // Add this directive at the top

import Sidebar from '../components/Sidebar'; // Ensure the path is correct

const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9 d-flex flex-column align-items-center">
          <h1 className="mb-4">Profile Page</h1>
          <div className="w-75">
            <h2>User Information</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Bio:</strong> Software engineer with a passion for coding and learning new technologies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
