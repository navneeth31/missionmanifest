import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from './TodoList';
import './Home.css';
function Home()
{
    const isLoggedIn = !!localStorage.getItem('token');
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
          navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    return (
        <TodoList/>
    )
}
export default Home;