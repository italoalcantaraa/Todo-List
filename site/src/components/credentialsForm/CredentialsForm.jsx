import './StyleCredentialsForm.css'
import { useState } from "react";
import logo from '../../assets/images/logo.svg';
import profile from '../../assets/images/user.svg';
import lock from '../../assets/images/lock.svg';

export default function CredentialsForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container-credentials" >
            <img id="logo" src={logo} alt="" />
            <div>
                <div className="username">
                    <img src={profile} alt="" />
                    <input type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="password">
                    <img src={lock} alt="" />
                    <input type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <button>LOGIN</button>
        </div>
    );
}