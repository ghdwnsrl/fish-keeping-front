import './App.css'
import Header from "./components/page/Header.jsx";
import Main from "./components/page/Main.jsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import ScrollToTop from "./api/ScrollToTop.js";
import {store, persistor} from './feature/store';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import GlobalDialog from "./components/GlobalDialog.jsx";
import Footer from "./components/page/Footer.jsx";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ScrollToTop/>
                    <div className='min-h-screen flex flex-col'>
                        <Header/>
                        <Main>
                            <Suspense>
                                <Outlet/>
                            </Suspense>
                        </Main>
                        <Footer/>
                    </div>
                    <GlobalDialog/>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
