import React, {useState}   from 'react';
import { useHistory } from 'react-router-dom' ;

import './styles.css';
import apiGitHub from '../../services/apiGitHub';

export default function Search(){

    const [userName, setUserName] = useState('');
    const history = useHistory();

    async function handleSearch(e){
        e.preventDefault();
        try{
            const response = await apiGitHub.get(`/users/${userName}`);

            localStorage.setItem('userName', response.data.login);
            localStorage.setItem('avatar_url', response.data.avatar_url);
            localStorage.setItem('html_url', response.data.html_url);
            localStorage.setItem('location', (!response.data.location ? "not registered": response.data.location));
            localStorage.setItem('followers', response.data.followers);
            localStorage.setItem('following', response.data.following);
            localStorage.setItem('created', response.data.created_at);
            localStorage.setItem('count_repos', response.data.public_repos);

            history.push('/repositories');
        }catch(err){
            alert('Usuário não encontrado, tente novamente.')
        }
    }

    return (
        <div className="search-container">

            <section className="form">

                <form onSubmit={handleSearch}>

                    <input placeholder="Username GitHub"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />

                    <button className="button">Search</button>


                </form>

            </section>

            
        </div>
    );

}