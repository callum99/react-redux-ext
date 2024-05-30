import { Dashboard } from './components/dashboard/dashboard';

const App = ({}) => {
    return (
        <div>
            <Dashboard
                headingText='Redux Testing'
                increaseBtnText='Increase Count'
                decreaseBtnText='Decrease Count'
            />
        </div>
    );
};

export default App;
