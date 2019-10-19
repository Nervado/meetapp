import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

// import Notifications from '~/components/Notifications';

import { Container, Content, Profile, Button } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <button type="button">Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
