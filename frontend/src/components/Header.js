import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">PrepX</div>
        <ul className="flex space-x-4">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/test">Test</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
