import {
    MODAL_OPEN,
    MODAL_CLOSE
} from '../actions/modal';

const initialModalState = {
    modalIsActive: false,
}

export const modalReducer = (state=initialModalState, action)=>{
    switch (action.type){
        case MODAL_OPEN:{
            return {
                modalIsActive: true,
            }
        }
        case MODAL_CLOSE:{
            return{
                modalIsActive: false,
            }
        }
        default: {
            return state
        }
    }
}