import React from 'react';
import { ColorProvider } from "./contexts/Contexto";
import Main from "./pages/Main";

const App: React.FC = () => (
  <ColorProvider>
    <Main />
  </ColorProvider>
);

export default App;