import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <Categories />
    </div>
  );
};

export default Home;
