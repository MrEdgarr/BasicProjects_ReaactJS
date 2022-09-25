import './App.css';
import items from './data'
import Categories from './Categories';
import Menu from './Menu';
import { useState } from 'react';


/* 
  - Tạo mảng mới theo category
  - Gộp những phần tử giống nhau
*/
const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items)
      return;
    }

    //Hiển thi theo category
    const newItems = items.filter((item) => item.category === category)
    setMenuItems(newItems);
  }
  return (
    <>
      <section className='menu section'>
        <div className='title'>
          <h2>our menu</h2>
          <div className='underline'></div>
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </>
  );
}

export default App;
