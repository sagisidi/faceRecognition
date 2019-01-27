function firstDuplicate(a) {

    let min_index = -1;
    const varia = a.reduce((min_index,curr) => {
        let sec_occurence = a.indexOf(curr) ;
        if (sec_occurence> -1 && min_index>-1)
            return sec_occurence;
              
    },0)
}