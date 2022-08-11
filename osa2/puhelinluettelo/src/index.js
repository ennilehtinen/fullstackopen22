import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'

const persons = [
  {
    id: 1,
    name: 'Kari Hellas',
    number: '0401231244',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '0401231245',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '0401231246',
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons} />
)