import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileComponent from '../components/ProfileComponent';

function Profile() {
  return (
    <div>
      Perfil
      <Header title="Profile" IconSearch={ false } />
      <ProfileComponent />
      <Footer />

    </div>
  );
}

export default Profile;
