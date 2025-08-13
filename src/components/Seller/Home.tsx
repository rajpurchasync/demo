import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import HowItWorks from './HowItWorks';

interface HomeProps {
  onStartSelling: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartSelling }) => {
  return (
    <>
      <Hero onStartSelling={onStartSelling} />
      <About />
      <Services />
      <HowItWorks />
    </>
  );
};

export default Home;