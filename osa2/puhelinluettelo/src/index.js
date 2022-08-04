import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'

const persons = [
  {
    id: 1,
    name: 'Kari Hellas',
    number: '0401231244',
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons} />
)