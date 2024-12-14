import React from 'react';
import '../styles/Home.css';
import Input from './Input';

const Home = () => {
    return(
        <div className="home">
            <header>
                <h1>Github Profile Analyzer</h1>
                <p>Interested in insights and Activity of a profile on Github, this is your right place</p>
            </header>
            <main>
                <Input />
            </main>
            <footer>
                <p>Powered by GitHub API</p>
            </footer>
        </div>
    );
}

export default Home;