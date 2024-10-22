import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully!');
        return navigate('/login');
    };

    return (
        handleLogout()
    );
}

export default LogoutButton;
