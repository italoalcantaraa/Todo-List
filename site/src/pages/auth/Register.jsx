import CredentialsForm from '../../components/form/credentialsForm/CredentialsForm';
import { useNavigate } from 'react-router-dom';
import './StyleAuth.css';
import { createUser } from '../../service/service';

export default function Register() {

    const navigation = useNavigate();

    const goToLogin = () => {
        navigation("/login");
    }

    const createAccount = async (data) => {
        await createUser(data);
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