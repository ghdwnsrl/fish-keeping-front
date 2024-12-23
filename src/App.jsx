import './App.css'
import Header from "./components/page/Header.jsx";
import Main from "./components/page/Main.jsx";
import {Outlet} from "react-router-dom";
import {AuthContext} from "./contexts/AuthContext.jsx";
import {useState} from "react";
import ScrollToTop from "./api/ScrollToTop.js";
import {store, persistor} from './feature/store';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import PopupMessage from "./components/PopupMessage.jsx";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    return (
        <AuthContext.Provider value={{isLogin, setIsLogin, username, setUsername}}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ScrollToTop/>
                    <div className='min-h-screen'>
                        <Header/>
                        <Main>
                            <Outlet/>
                        </Main>
                    </div>
                </PersistGate>
            </Provider>
        </AuthContext.Provider>
    )
}

export default App
