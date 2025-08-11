/* eslint-disable no-unused-vars */
import './StyleCredentialsForm.css'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import logo from '../../../assets/images/logo.svg';
import profile from '../../../assets/images/user.svg';
import lock from '../../../assets/images/lock.svg';
import imageLoader from '../../../assets/images/loading.svg';

export default function CredentialsForm({ login, createAccountOrLogin, buttomText, redirectText, navigate }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const slideInLeft = {
        initial: { x: -1000, opacity: 0 },
        animate: { x: 0, opacity: 1 }
    };

    function request() {
        setLoading(true);

        setTimeout(() => {
            createAccountOrLogin();
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="container-credentials" >
            <motion.img
                variants={slideInLeft}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4 }} id="logo" src={logo} alt="" />
            <div className='data'>
                <motion.div
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5 }}
                    className="username">
                    <img src={profile} alt="" />
                    <input type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </motion.div>
                <motion.div
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6 }}
                    className="password">
                    <img src={lock} alt="" />
                    <input type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </motion.div>
            </div>
            <motion.div
                variants={slideInLeft}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="actions">
                {loading
                    ? <button><img src={imageLoader} /></button>
                    : <motion.button
                        onClick={() => request()}>
                        {buttomText}
                    </motion.button>
                }

                <p>{redirectText} <span onClick={() => navigate()}>{
                    login ? "Sign up!" : "Login."}</span>
                </p>
            </motion.div>
        </div>
    );
}