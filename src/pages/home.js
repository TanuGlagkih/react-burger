import BurgerConstructor from '../components/burger-constructor/burger-constructor.js';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients.js';
import styles from './pages.module.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function HomePage() {

    return (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
    );
  }
  
