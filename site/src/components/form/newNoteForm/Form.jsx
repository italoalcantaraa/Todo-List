/* eslint-disable no-unused-vars */
import './StyleForm.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Form(props) {
    const [name, setName] = useState("");
    const themes = {
        light: { className: "content-form" },
        dark: { className: "content-form-dark" }
    };

    const currentTheme = props.isLight ? themes.light : themes.dark;

    useEffect(() => {
        if (props.id != null) {
            let task = props.list.filter(item => item.id === props.id);
            setName(task[0].name);
        }
    }, [props.id]);

    const closeWindow = () => {
        props.setId(null);
        props.setOn(false);
        setName("");
    }

    const addOrChange = () => {
        if (props.id != null) {
            let newList = [...props.list];

            for (let i = 0; i < props.list.length; i++) {
                if (props.id === newList[i].id) {
                    newList[i].name = name;
                }
            }
            props.setList(newList);
            props.setId(null);
        } else {
            props.setList([...props.list, { id: props.list.length, name: name, finished: false }]);
        }

        setName("");
        props.setOn(false);
    };

    return (
        <AnimatePresence> {props.on && (
            <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.3 }}
                className="container-form"
            >
                <div className={currentTheme.className}>
                    <div className="note">
                        <h1>NEW NOTE</h1>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Input your note...'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter')
                                    addOrChange();
                            }}
                        />
                    </div>
                    <div className='actions-form'>
                        <button id='cancel' onClick={() => closeWindow()}>CANCEL</button>
                        <button id='apply' onClick={() => addOrChange()}>APPLY</button>
                    </div>
                </div>
            </motion.div>
        )}
        </ AnimatePresence >
    );
}