/* eslint-disable no-unused-vars */
import './StyleHome.css';
import search from '../../assets/images/search.svg';
import mool from '../../assets/images/moon.svg';
import sun from '../../assets/images/sun.svg';
import pencil from '../../assets/images/pencil.svg';
import trash from '../../assets/images/trash.svg';
import add from '../../assets/images/add.svg';
import empty from '../../assets/images/empty.svg';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Form from '../../components/form/newNoteForm/Form';

export default function Home() {
  const [itemSearch, setItemSearch] = useState("");
  const [activePopUp, setActivePopUp] = useState(false);
  const [list, setList] = useState([]);
  const [itemFilter, setItemFilter] = useState("1");
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isLight, setIsLight] = useState(
    localStorage.getItem("isLight")
      ? JSON.parse(localStorage.getItem("isLight"))
      : true
  );

  const changeTheme = () => {
    const newValue = !isLight;
    setIsLight(newValue);
    localStorage.setItem("isLight", JSON.stringify(newValue));
  }
  
  const themes = {
    light: { className: "container-home", icon: sun },
    dark: { className: "container-home-dark", icon: mool }
  };

  const currentTheme = isLight ? themes.light : themes.dark;

  const changeStatus = (id) => {
    const newList = [...list];
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id == id) {
        newList[i].finished = !newList[i].finished;
      }
    }

    setList(newList);
  };

  const deleteItem = (id) => {
    const newList = list.filter(e => e.id !== id)
    setList(newList);
  };

  const filter = () => {
    let filteredList = [];

    switch (itemFilter) {
      case "1":
        filteredList = list;
        break;
      case "2":
        filteredList = list.filter(e => e.finished);
        break;
      case "3":
        filteredList = list.filter(e => !e.finished);
        break;
    }

    if (itemSearch != "") {
      filteredList = filteredList.filter(e =>
        e.name.toLowerCase().includes(itemSearch.toLowerCase()));
    }

    return filteredList;
  };

  useEffect(() => { },
    [itemToEdit]);

  useEffect(() => {
    filter();
  }, [itemSearch]); // chamar o filter sempre que o item de busca for alterado

  const callEdit = (id) => {
    setItemToEdit(id);
    setActivePopUp(true);
  }

  return (
    <div className={currentTheme.className}>
      <Form on={activePopUp} setOn={setActivePopUp} list={list} setList={setList} id={itemToEdit} setId={setItemToEdit} isLight={isLight} />
      <div className='content-home'>
        <div className='n1'>
          <h2>TODO LIST</h2>
          <div className='search'>
            <div className='input'>
              <input type="text" placeholder='Search note...'
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)} />
              <img src={search} alt="" />
            </div>
            <select value={itemFilter} onChange={(e) => setItemFilter(e.target.value)} name="" id="">
              <option value="1">ALL</option>
              <option value="2">FINISHED</option>
              <option value="3">NOT FINISHED</option>
            </select>
            <div className='theme' onClick={() => changeTheme()}>
              <img src={currentTheme.icon} alt="" />
            </div>
          </div>
          <div className="list">
            <AnimatePresence mode="wait">
              {filter().length === 0 ?
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="empty">
                  <img src={empty} />
                  <p> <strong>Empty...</strong> </p>
                </motion.div> :
                filter().map((item) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    key={item.id} className="item">
                    <div>
                      <input type="checkbox" checked={item.finished} onClick={() => changeStatus(item.id)

                      } />
                      <p id='task-name'><strong>{item.name}</strong></p>
                    </div>
                    <div className='actions'>
                      <img src={pencil} onClick={() => callEdit(item.id)} alt="" />
                      <img src={trash} onClick={() => deleteItem(item.id)} />
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
        <img id='add' src={add} alt="" onClick={() => setActivePopUp(true)} />
      </div>
    </div>
  )
};