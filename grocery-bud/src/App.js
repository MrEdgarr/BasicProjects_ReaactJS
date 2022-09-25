
import React, { useCallback, useEffect, useState } from 'react';
import List from './List';

/*
  Code các chức năng cơ bản thêm, sửa xóa
  Luu dữ liệu trên localStorage
  Sử dụng filter cho chức năng xóa theo id
  Và dùng find cho chức năng tìm kiếm theo id được tìm thấy đầu tiên trong mảng
*/

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return []
  }
}


function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEdditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please endter value')
    }
    else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item;
      }))
      setName('');
      setEditID(null);
      setIsEdditing(false);
      showAlert(true, 'success', 'value changed');
    }
    else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);

    setIsEdditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const fetchBusinesses = useCallback(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])
  useEffect(() => {
    fetchBusinesses();
  }, [list, fetchBusinesses])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input type="text"
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>


      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>
    </section>
  );
}

export default App;
