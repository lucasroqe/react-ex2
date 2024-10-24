import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 

ReactDOM.render(<App />, document.getElementById('root'));

export interface RGBProps {
  id: number;
  r: number;
  g: number;
  b: number;
}

export interface ErrorProps {
  error: string;
}