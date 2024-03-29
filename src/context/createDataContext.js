import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) =>{
        const [state, dispatch] = useReducer(reducer, defaultValue); //shared w all components

        const boundActions={};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        } // functions used to change state

        return (
            <Context.Provider value={{state,...boundActions}}> 
            {children}
            </Context.Provider>
        )
    }

    return { Context, Provider }
}