import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Alert } from "./components";
import { LoginPage, LandingPage, RegisterPage, ProfilePage, ExamplesPage } from "./pages";
// add redux
import { Provider } from "react-redux";
import store from "./store";
// Get Current User
import setAuthToken from "./utils/setAuthToken";
import { getCurrentUser } from "./actions/authActions";
import ProtectedRoute from "./utils/protctedRoute"
// Get Current User
if (localStorage.token) {
	setAuthToken(localStorage.token);
}


function App() {
	useEffect(() => {
		store.dispatch(getCurrentUser());
	}, []);


	return (
		<Provider store={store}>
			<div className="App">
				<div className="container">
					<BrowserRouter>
						<Navbar></Navbar>
						<div className="row my-4">
							<div className="col-6 mx-auto">
								<Alert />
							</div>
						</div>
						<Routes>
							<Route index path="/" element={<LandingPage></LandingPage>}></Route>
							<Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
							<Route path="/login" element={<LoginPage></LoginPage>}></Route>
							<Route path="/examples" element={<ExamplesPage></ExamplesPage>}></Route>
							<Route path="/dashboard">
								<Route path="/dashboard/profile" element={<ProtectedRoute component={ProfilePage}></ProtectedRoute> }></Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</div>
			</div>
		</Provider>
	);
}

export default App;
