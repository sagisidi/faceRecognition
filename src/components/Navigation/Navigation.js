import React from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import './Navigation.css';
import Logo from './logo_small.png';

/*const Signout = () => <h2>Sign</h2>;
const register = () => <h2>Sign in</h2>;
*/

const Navigation =  ({loggedIn}) =>{
		if (loggedIn && window.location.href.includes('profile') ) {
			return (
				<div className="nav">
					<ul>
						<img className="logo" alt="logo" src={Logo} />
						<li className="f3 link dim black">
							<Link to="/">
									Sign Out
							</Link>
						</li>
					</ul>


			    </div>

			)

		}
		else{
			return (
				<div className="nav">
					<ul>
						<img  className="logo" alt="logo"  src={Logo} />
						<li className="f3 link dim black">
							<Link to="/Signin">sign in</Link>
						</li>
						<li className="f3 link dim black">
							<Link to="/Register">register</Link>
						</li>

					</ul>


			    </div>
			)

		}
	


	

}

export default Navigation;



