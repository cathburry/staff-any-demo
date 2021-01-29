import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = ({ children }: any) => (
    <div>
      <Header />
        { children }
      <Footer />
    </div>
  )

export default App;
