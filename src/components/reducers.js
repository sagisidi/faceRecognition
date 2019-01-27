import {
		CHANGE_SEARCH_FIELD,
		FACE_RECOGNITION_PENDING,
		FACE_RECOGNITION_SUCCESS,
		FACE_RECOGNITION_FAILED,
		SIGN_IN_OUT,
		LOAD_USER,
		UPDATE_ENTRIES
		} from './constants.js'

const textState = {
	textField:''

}

export const changeSearchField = (state = textState , action={}) =>{
	switch(action.type){
		case CHANGE_SEARCH_FIELD:
			return Object.assign({},state,{textField:action.payload});
		default:
			return state;

	}

}

const submitState = {
	box:{},
	isPending:true,
	error:'',
	imageUrl:''
}

export const onSubmit = (state = submitState , action={}) =>{
	
	switch(action.type){
		case FACE_RECOGNITION_PENDING:
			return Object.assign({},state,{isPending:true});
		case FACE_RECOGNITION_SUCCESS:
			const image_url = action.payload.rawData.outputs[0].input.data.image.url;
			const box_data = calculateFaceLocation(action.payload);
			
			return Object.assign({},state,{isPending:false,imageUrl:image_url,box:box_data});
		case FACE_RECOGNITION_FAILED:
			return Object.assign({},state,{error:action.payload,isPending:false});
		default:
			return state;

	}
}



const userData ={
	loggedIn:false,
	user:{
		id:'',
		name:'',
		email:'',
		entries:0,
		joined:''		
	}

}

export const signInOut = (state = userData , action={}) =>{
	switch(action.type){
		case SIGN_IN_OUT:
			const newUser ={
					id:'',
					name:'',
					email:'',
					entries:0,
					joined:''		
			}
			return Object.assign({},state,{loggedIn:false,user:newUser});
		case LOAD_USER:
			return Object.assign({},state,{user:action.payload,loggedIn:true});
		case UPDATE_ENTRIES:
			let new_user = state.user; 
			new_user.entries= action.payload;
			return Object.assign({},state,{user:new_user});
		default:
			return state;

	}

}
  function calculateFaceLocation(response){
    const faceData =response.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    return  {
      leftCol:faceData.left_col * width,
      topRow:faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)

    }

  }
