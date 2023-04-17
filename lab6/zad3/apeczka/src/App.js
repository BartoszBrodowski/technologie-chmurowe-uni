import './App.css';

function App() {
	function sendRequest() {
		fetch('backend:3333').then((response) => {
			console.log(response);
		});
	}
	return (
		<div className='App'>
			<button onClick={() => sendRequest}>Send Request</button>
		</div>
	);
}

export default App;
