import React, {useState,useEffect} from 'react';
import { FiPower,  FiLogIn, FiCodesandbox}  from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom' ;

import './styles.css';
import apiGitHub from '../../services/apiGitHub';

export default function Repositories(){
    const history = useHistory();

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    const userName = localStorage.getItem('userName');
    const avatar_url = localStorage.getItem('avatar_url');
    const html_url = localStorage.getItem('html_url');
    const location = localStorage.getItem('location');
    const followers = localStorage.getItem('followers');
    const following = localStorage.getItem('following');
    const created = formatDate(localStorage.getItem('created'));
    const count_repos = localStorage.getItem('count_repos');

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        apiGitHub.get(`/users/${userName}/repos`)
        .then(response => {
            setRepos(response.data)
        })
    }, [userName]);

   

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="repositories-container">

            <header>

                <img src={avatar_url} alt="avatar"></img>
                
                <div>

                    <div>
                        <h1>{userName}</h1>

                        <div className="actionsProfiler">
                            <a className="acess-git-link" target="_blank" href={html_url}>
                                <FiLogIn size={24} color="#e02041" />
                                    Profile Git
                            </a>    

                            <button onClick={handleLogout} type="button">
                                <FiPower size={18} color="#E02041" />
                            </button>
                        </div>

                    </div>
                    

                    <ul>
                        <li><p>Location:</p>  {location}</li>  
                        <li><p>Followers:</p>  {followers}</li>
                        <li><p>Following:</p>  {following}</li>  
                        <li><p>Created account:</p>  {created}</li>  
                        <li><p>Public repos:</p>  {count_repos}</li>  
                    </ul>
                </div>      


            </header>

            <section className="main-content">
                <ul>

                    {repos.map(repo => (
                        <li key={repo.id}>
                        <h2>
                                <FiCodesandbox size={20} color="#78C2DA"/>
                                {repo.name}
                                
                                <a className="acess-git-repo-link" target="_blank" href={repo.html_url}>
                                    <FiLogIn size={18} color="#e02041" />
                                        In Git
                                </a> 
                            </h2>

                            <h3>{repo.description}</h3>

                            <strong>Language: <p> {repo.language}</p></strong> 

                        </li>
                    ))}
                </ul>


            </section>

        </div>
    )
}