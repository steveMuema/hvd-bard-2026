import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Play from '../../pages/Play';
import NotFoundPage from '../../pages/NotFoundPage';
import ConnectWallet from '../../pages/ConnectWallet';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import PlayerTableSimulation from '../../pages/PlayerTableSimulation';

/**
 * Application Routes Component
 * Defines all application routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ConnectWallet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/play" element={<Play />} />
      <Route path="/player-table" element={<PlayerTableSimulation />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
