import {
		CHANGE_SEARCH_FIELD,
		FACE_RECOGNITION_PENDING,
		FACE_RECOGNITION_SUCCESS,
		FACE_RECOGNITION_FAILED,
		SIGN_IN_OUT,
		LOAD_USER,
		UPDATE_ENTRIES
		} from './constants.js';



export const changeSearchFieldAction = (text) => ({
	type:CHANGE_SEARCH_FIELD,
	payload:text

})


export const onSubmitAction = () =>(dispatch,getState) =>{
	dispatch({type:FACE_RECOGNITION_PENDING});
	fetch('https://calm-wildwood-45339.herokuapp.com/imageUrl',{
	method:'post',
	headers:{'Content-Type':'application/json'},
	body:JSON.stringify({
		input:getState().changeSearchField.textField
		})
	})
	.then(response => response.json() )
    .then(response =>{
    		if(response.outputs){
    			fetch('https://calm-wildwood-45339.herokuapp.com/image',{
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








