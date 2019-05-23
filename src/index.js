// js file that's loaded along with index.html
// loads react, App component

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// render app inside #root in index.html
ReactDOM.render(<App />, document.getElementById('root'));
