import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/auth-context';

const TopHeader = (props) => {
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  const topBarStyle = {
    height: '75px',
    width: '100%',
    backgroundColor: 'hsl(0deg, 0%, 0%)',
    display: 'grid',
    position: 'fixed',
    marginTop: '0',
    marginBottom: '50px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 5fr 250px',
    justifyItems: 'center',
    alignItems: 'center',
    zIndex: '1',
  };

  const linkStyles = {
    margin: '0 50px',
    textDecoration: 'none',
    fontSize: '16px',
  };
  return (
    <div style={topBarStyle}>
      <NavLink to="/artists">Artists</NavLink>
      <NavLink to="/albums">Albums</NavLink>
      <NavLink to="/songs">Songs</NavLink>
      <NavLink to="/playlists">Playlists</NavLink>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          justifySelf: 'end',
        }}
      >
        {isLoggedIn ? (
          <>
            <h1 style={{ ...linkStyles, color: '#bfbfbf' }}>
              Welcome,{' '}
              <span>{JSON.parse(localStorage.getItem('user')).nickname}</span>
            </h1>
            <NavLink style={{ ...linkStyles }} to="/" onClick={onLogout}>
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink style={{ ...linkStyles }} to="/login">
              Log In
            </NavLink>
            <NavLink style={{ ...linkStyles }} to="/signup">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
      <div />
    </div>
  );
};

export default TopHeader;