import React from "react"; 

export const Context = React.createContext(null)

const injectContext = PassedComponent => {

    const getState = ({getStore, getActions, setStore}) => {
        return {
            store: {
                token: null,
            },
            actions: {
                login: async (inputs) => {
                        try{
                            const resp = await fetch('/api/login', {
                                method: 'POST',
                                headers: {"Content-Type":"application/json"},
                                body: JSON.stringify(inputs),
                              })
                            if (resp.status !== 200) {
                                alert("There has been an error");
                                return false;
                            }
    
                            const data = await resp.json();
                            console.log("this has come from backend", data);
                            sessionStorage.setItem("token", result.access_token);
                            setStore({ token: data.access_token});
                            return true;
                        }
                        catch(error){
                          console.error("THERE WAS AN ERROR!!!", error)
                        }
                }
            }
        }
    }

    const StoreWrapper = props => {
        const [state, setState] = React.useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: {...state.actions}
                    })
            })
        );

        return (
            <Context.Provider value={state}>
                    <PassedComponent {...props} />
            </Context.Provider>
        );
        };
    return StoreWrapper;
    }

export default injectContext;