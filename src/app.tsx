import { Dashboard } from './components/dashboard/dashboard';

const App = ({}) => {
    return (
        <Dashboard
            headingText='Redux Testing'
            increaseBtnText='Increase Count'
            decreaseBtnText='Decrease Count'
        />
    );
};

export default App;
