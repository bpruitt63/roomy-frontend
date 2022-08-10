import React, {useState} from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';
import AppRoutes from './AppRoutes';
import NavB from './NavB';
import RoomyApi from './RoomyApi';

function App() {

	const [user, setUser] = useState(localStorage.roomyToken &&
							jwt_decode(localStorage.getItem("roomyToken")).user);

	const handleToken = (token) => {
		localStorage.setItem("roomyToken", token);
		setUser(jwt_decode(token).user);
		RoomyApi.token = token;
	};

	return (
		<div className="App">
			<NavB user={user}
					setUser={setUser} />
			<AppRoutes user={user}
						handleToken={handleToken}
						setUser={setUser} />
		</div>
	);
};

export default App;
