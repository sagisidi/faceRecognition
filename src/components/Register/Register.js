import React from 'react';
import './Register.css'


class  Register extends React.Component {

	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			password:'',
			confPassword:'',
			errordisp:'none'
		}
	}

	checkPass = () =>{
		const pass = this.state.confPassword;
		const confPass = this.state.password;
		if( pass !== confPass && pass.length>0 && confPass.length>0
			){
			this.setState({errordisp:'block'});
			return false;
		}
		else{
			this.setState({errordisp:'none'});
			return true;
		}
	}
	onNameChange = (event,field) =>{
		this.setState({name:event.target.value});
	}
	onEmailChange = (event) =>{
		this.setState({email:event.target.value});
	}
	onPassChange = (event) =>{
		this.setState({password:event.target.value},
			() => { this.checkPass() });
	}
	onPassConfChange = (event) =>{
		this.setState({confPassword:event.target.value},
			() => { this.checkPass() });
	}
	sendData(){
		if(this.checkPass()){
			fetch('http://localhost:3002/Register',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					name:this.state.name,
					email:this.state.email,
					password:this.state.password

				})
			})
		    .then(response => response.json())
		    .then(user =>{
		    		if(user){
		    			this.props.signInOut(user);
		    			this.props.history.push('/profile/'+user.id)

		    		}
		    		else{
		    			alert('Register Failed')
		    		}
		    		
		    })
		}	

	}


	render(){
		return (
				<div className="cont_principal">

					<div className="cont_centrar reg">
						<div className="cont_login">
								<div className="cont_tabs_login">
									<ul className='ul_tabs'>
										<p>Register</p>
										<span className="linea_bajo_nom"></span>
									
									</ul>
								</div>
								<div className="cont_text_inputs">
									<input type="text" className="input_form_sign " placeholder="NAME" name="name" onChange={(e) => this.onNameChange(e,'name')}/>

									<input type="text" className="input_form_sign " placeholder="EMAIL" name="email" onChange={this.onEmailChange}/>

									<input type="password" className="input_form_sign " placeholder="PASSWORD" name="pass" onChange={this.onPassChange}/>  
	  
	  								<input type="password" className="input_form_sign " placeholder="CONFIRM PASSWORD" name="conf_pass" onChange={this.onPassConfChange}/>

	  								<p className="error" style={{display:this.state.errordisp}}>*Password must be equals</p>
									<div className="terms_and_cons ">
										<p><input type="checkbox" name="terms_and_cons" /> <label htmlFor="terms_and_cons">Accept  Terms and Conditions.</label></p>

									</div>
								</div>
								<div className="cont_btn">
									<button className="btn_sign" onClick={this.sendData.bind(this)}>Register</button>

								</div>
						</div>

					</div>


				</div>

		)
	}

}

export default Register;

