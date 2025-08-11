import CredentialsForm from '../../components/form/credentialsForm/CredentialsForm';
import { useNavigate } from 'react-router-dom';
import './StyleAuth.css';

export default function Register() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    const createAccount = () => {
        console.log("Conta criada");
        navigate("/")
    }

    return (
        <div className="container-auth">
            <CredentialsForm
                login={false}
                createAccountOrLogin={createAccount}
                buttomText="REGISTER"
                redirectText="Do you have an account?"
                navigate={goToLogin}
            />
        </div>
    )
}