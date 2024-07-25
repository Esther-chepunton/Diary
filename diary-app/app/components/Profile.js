// app/components/Profile.js
import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Muna Numan Said",
    bio: "Software Engineer with a passion for creating intuitive applications.",
    email: "muna@example.com",
    imageUrl: "/Users/munanuman/Downloads/Diary/diary-app/download.png", // Make sure the path is correct
  });

  return (
    <div className="profile-card card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="profile-image">
        <img src={profile.imageUrl} alt={`${profile.name}'s profile`} className="img-fluid rounded-circle" />
      </div>
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;
