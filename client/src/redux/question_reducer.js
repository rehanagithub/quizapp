import {createSlice} from "@reduxjs/toolkit";
//create slice to create a reducer with initial value.
export const questionReducer=createSlice({
    name:'questions',
    initialState:{
        queue:[],   //to store all my questions
        answers:[],  //to store all the answers
        trace:0    //to track the user questions
    },
    reducers:{                                //reducer allows you to create a function.
        startExamAction:(state,action)=>{
            let {question,answers}=action.payload
             return {
                ...state,        //to update the value of initial state we are using spread operator.
                queue:question,
                answers   //Inside this payload property you get user input value.
             }
        },
        moveNextAction:(state)=>{
            return {
                ...state,
                trace:state.trace+1
            }
        },
        movePrevAction:(state)=>{
            return{
                ...state,
                trace:state.trace-1
            }
        },
        resetAllAction:()=>{
            return {
                queue:[],
                answers:[],
                trace:0
            }
        }
    }
})
export const {startExamAction,moveNextAction,movePrevAction,resetAllAction}=questionReducer.actions ;//
export default questionReducer.reducer;