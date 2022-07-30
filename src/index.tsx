import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from "./services/store";
import { BrowserRouter as Router } from 'react-router-dom';

const root = document.getElementById('root')

if (root){
ReactDOM.createRoot(root).render(
<Router>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
</Router>
)
}

// root.render(
//     <Router>
//       <React.StrictMode>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </React.StrictMode>
//     </Router>
// );


//   ReactDOM.render((
//     <Router>
//       <React.StrictMode>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </React.StrictMode>
//     </Router>),
//     document.getElementById('root')
// );