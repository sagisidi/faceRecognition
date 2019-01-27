import React from 'react';



const Rank =  ({name,entries}) =>{
	return (
		<div >
			<p className="f4 center">
				{'Hello ' + name +' Your rank is...'}
			</p>
			<p className="f4 center">
				{entries}
			</p>			
		</div>


	)

}

export default Rank;