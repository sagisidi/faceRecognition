import React from 'react';
import './Signin.css'

class Signin extends React.Component {


	constructor(props){
		super(props);
		this.state={
			emailF:'',
			passwordF:''
		}
	}

	onEmailChange = (event) =>{
		this.setState({emailF:event.target.value})
	}

	onPassChange = (event) =>{
		this.setState({passwordF:event.target.value})
	}

	onSubmitData = () =>{
		const {emailF,passwordF} = this.state;
			fetch('https://calm-wildwood-45339.herokuapp.com/Signin',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					email:emailF,
					password:passwordF

				})
			})
		    .then(response => response.json())
		    .then(user =>{
		    		if(user.id){
		    			this.props.signInOut(user);
		    			console.log(user);
		    			this.props.history.push('/profile/'+user.id)

		    		}
		    		else{
		    			this.props.signInOut(false);
		    		}
		    		
		    })
		
		//this.props.location.pathname='/loggedin';


	}

	render(){

	return (
			<div className="cont_principal">

				<div className="cont_centrar">
					<div className="cont_login">
							<div className="cont_tabs_login">
								<ul className='ul_tabs'>
									
									<p>SIGN IN</p>
									<span className="linea_bajo_nom"></span>
									
								</ul>
							</div>
							<div className="cont_text_inputs">

								<input type="text" className="input_form_sign " placeholder="EMAIL" name="email" onChange={this.onEmailChange}/>

								<input type="password" className="input_form_sign " placeholder="PASSWORD" name="pass" onChange={this.onPassChange}/>  

							</div>
							<div className="cont_btn">
								
									<button className="btn_sign" onClick={this.onSubmitData.bind(this)}>
 									SIGN IN 
									</button>
								

							</div>
							<div>
								<a href="/forogt_pass" className="link_forgot_pass d_block" >Forgot Password ?</a>    
							</div>
					</div>

				</div>


			</div>

	)





	}


}

export default Signin;

