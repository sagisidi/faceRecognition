import {
		CHANGE_SEARCH_FIELD,
		FACE_RECOGNITION_PENDING,
		FACE_RECOGNITION_SUCCESS,
		FACE_RECOGNITION_FAILED,
		SIGN_IN_OUT,
		LOAD_USER,
		UPDATE_ENTRIES
		} from './constants.js';

import Clarifai from 'clarifai';


  const app = new Clarifai.App({
   apiKey: 'fa20fa9c06214d298d7cff49b25767b1'
  });


export const changeSearchFieldAction = (text) => ({
	type:CHANGE_SEARCH_FIELD,
	payload:text

})


export const onSubmitAction = () =>(dispatch,getState) =>{
	dispatch({type:FACE_RECOGNITION_PENDING});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,getState().changeSearchField.textField )
    .then((response) =>{
    		if(response){
    			fetch('http://localhost:3002/image',{
				method:'put',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({

					id:getState().signInOut.user.id

					})
				})
				.then(resp => resp.json() )
				.then(entries => {
					dispatch({type:UPDATE_ENTRIES,payload:entries}) 	
					dispatch({type:FACE_RECOGNITION_SUCCESS,payload:response}) 	
				}).catch(err => 
						dispatch({type:FACE_RECOGNITION_FAILED,payload:err})
				)

    		}

    		
    	 })
    .catch( (err) =>    dispatch({type:FACE_RECOGNITION_FAILED,payload:err}));     
}


export function signInOutAction(data){
	return (dispatch,getState) => {

		if(data === false){
			dispatch({type:SIGN_IN_OUT,payload:data});			
		}
		else{
			getState().changeSearchField.textField = "";
			dispatch({type:LOAD_USER,payload:data})
		}

	}

}








