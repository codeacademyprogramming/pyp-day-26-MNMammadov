import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import RoomDetails from './components/RoomDetails';
import RoomsPlan from './components/RoomsPlan';

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/" component={RoomsPlan} exact />
                <Route path="/room/:roomId" component={RoomDetails} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
