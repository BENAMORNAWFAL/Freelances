import React, { useState, useEffect } from 'react';
import { SyntheticEvent } from 'react';
import Registration from './Registration';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompteProfile from '../Profile/compte/CompteProfile';

const Login = ({ setShowRegistration, showRegistration }: any) => {
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/backend/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setShowProfile(true);

        localStorage.setItem('admin', email === 'hamrounicukur@gmail.com' ? 'true' : 'false');

        if (data.data !== undefined) {
          localStorage.setItem('userId', data.data.user_id);
        }
      } else {
        toast.error('Utilisateur non trouvé', {
          autoClose: 2000,
          theme: 'colored',
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      console.log({ data });
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      toast.error('Erreur lors de la connexion', {
        autoClose: 2000,
        theme: 'colored',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []); 

  const getData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setShowProfile(true);
      }
    } catch (error) {
      console.log('Erreur lors de la récupération des données utilisateur', error);
    }
  };

  return (
    <div>
      <ToastContainer limit={1} />

      {showProfile ? (
        <CompteProfile setShowProfile={setShowProfile} />
      ) : (
        <form className="form_main" onSubmit={handleSubmit}>
          {!showRegistration ? (
            <>
              <p className="heading">Login</p>
              <div className="inputContainer">
                <input
                  placeholder="nom@mail.com"
                  id="email"
                  className="inputField"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="inputContainer">
                <input
                  placeholder="Mot de passe"
                  id="password"
                  className="inputField"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" id="button">
                Connexion
              </button>
              <a href="">Mot de passe oublié !</a>
              <div className="signupContainer">
                <button id="button" onClick={() => setShowRegistration(true)}>
                  Inscription
                </button>
              </div>
            </>
          ) : (
            <Registration />
          )}
        </form>
      )}
    </div>
  );
};

export default Login;
