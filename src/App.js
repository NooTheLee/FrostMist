import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useAppContext} from "./context/useContext";
import {ToastContainer} from "react-toastify";
// page
import {
    Home,
    Login,
    Register,
    ForgetPassword,
    Error,
    ProtectedLayout,
    ShareLayout,
} from "./page";
// layout
import {Dashboard, Messenger, Admin} from "./page/Layout";
import {Profile, UpdateProfile} from "./page/user";
import {Information} from "./page/Post";
// modal qrCode
import {ModalQrCode} from "./components";

const App = () => {
    const {dark, openModal, isQrCode} = useAppContext();
    return (
        <div className={`${dark ? "dark" : ""} relative `}>
            {/* Notification */}
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme={dark ? "dark" : "light"}
            />
            {/*QR code*/}
            {openModal && isQrCode && <ModalQrCode />}
            {/* Router */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedLayout>
                                <ShareLayout />
                            </ProtectedLayout>
                        }>
                        <Route
                            // @ts-ignore
                            index
                            path='/'
                            element={<Dashboard />}
                        />
                        <Route path='/messenger' element={<Messenger />} />
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/profile/*' element={<Profile />} />
                        <Route
                            path='/update-profile'
                            element={<UpdateProfile />}
                        />
                        <Route
                            path='/post/information/:id'
                            element={<Information />}
                        />
                    </Route>

                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    <Route
                        path='/forget-password'
                        element={<ForgetPassword />}
                    />

                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
