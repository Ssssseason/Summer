export const SET_NAVBARVAL = 'set_navbarval';
export const setNavBarVal = (navBarVal) => {
    return ({
        type: SET_NAVBARVAL,
        navBarVal: navBarVal,
    })
}

export const SET_REC_FINISHED = "set_rec_finished";
export const setRecHasFinished = (hasFinished)=>{
    return ({
        type: SET_REC_FINISHED,
        hasFinished: hasFinished,
    });
}