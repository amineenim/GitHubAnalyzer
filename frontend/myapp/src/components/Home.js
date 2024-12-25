import React, {useState} from 'react';
import '../styles/Home.css';
import Input from './Input';
import {FaSun, FaMoon} from 'react-icons/fa';

const Home = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
    };

    return(
        <div className="home">
            <header>
                <h1>Github Profile Analyzer</h1>
                <p>Interested in insights and Activity of a profile on Github, this is your right place</p>
                <div className="theme-toggle" onClick={toggleTheme} >
                    {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                </div>
            </header>
            <main>
                <Input theme={theme} />
            </main>
            <footer>
                <p>Powered by GitHub API</p>
            </footer>
        </div>
    );
}

export default Home;