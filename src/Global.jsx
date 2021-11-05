export default function setLogin() {

    const [token, setToken] = React.useState('');

    React.useEffect(() => {
        if (!token){
            getToken()
        }
    }, []);

const getToken = async () => {
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
        setToken({ data.access_token });
        return true;
    }
    catch(error){
        console.error("THERE WAS AN ERROR!!!", error)
    }
};
};


    






// const getState = ({getStore, getActions, setStore}) => {
//     return {
//         store: {
//             token: null,
//         },
//         actions: {
            
//             syncTokenFromSessionStore: () => {
//                 const token = sessionStorage.getItem("token");
//                 if (token && token != "" && token != undefined) {
//                     setStore({ token: token});
                    
//                 }
//             },
            
//             login: async (inputs) => {
//                     try{
//                         const resp = await fetch('/api/login', {
//                              method: 'POST',
//                             headers: {"Content-Type":"application/json"},
//                             body: JSON.stringify(inputs),
//                             })
//                         if (resp.status !== 200) {
//                             alert("There has been an error");
//                             return false;
//                         }
    
//                         const data = await resp.json();
//                         console.log("this has come from backend", data);
//                         sessionStorage.setItem("token", result.access_token);
//                         setStore({ token: data.access_token});
//                         return true;
//                     }
//                     catch(error){
//                         console.error("THERE WAS AN ERROR!!!", error)
//                     }
//                 }
//             }
//         }
//     }

//     export default getState;