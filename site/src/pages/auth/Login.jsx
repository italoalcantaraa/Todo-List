import { useNavigate } from 'react-router-dom';
import CredentialsForm from '../../components/form/credentialsForm/CredentialsForm';
import './StyleAuth.css';

export default function Login() {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate("/register");
    }

    const login = () => {
        console.log("Login!");
            navigate("/");
    }

    return (
        <div className='container-auth'>
            <CredentialsForm
                login={true}
                createAccountOrLogin={login}
                buttomText="LOGIN"
                redirectText="Don't have an account?"
                navigate={goToRegister}
            />
        </div>
    );
}