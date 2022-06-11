import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import styles from './app.module.css'
import React from 'react';
import Modal from '../modal/modal.js';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        <Modal />
      </main>
    </div>
  );
}

export default App;
