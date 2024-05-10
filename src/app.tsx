import React, { useEffect, useState } from 'react';
import ReduxWrapper from "./app/store/reduxWrapper";
import rootReducers from "./app/store/reducers/rootSlice";
import IncreaseButton from "./components/buttons/increaseButton/increaseButton";
import DecreaseButton from "./components/buttons/decreaseButton/decreaseButton";
import Heading from "./components/header/header";
import { StoreContext } from "./app/store/storeContext";

const popUpStore = new ReduxWrapper(rootReducers, true);

const App = ({}) => {
    const [count, setCount] = useState(popUpStore.getState().counter);

    useEffect(() => {
        popUpStore.subscribe(() => {
            setCount(popUpStore.getState().counter);
        });
    }, []);

    return (
        <StoreContext.Provider value={popUpStore}>
            <Heading headingText={'Redux Testing:'}/>
            <br/>
            <IncreaseButton btnText="Increase Count"/>
            <DecreaseButton btnText="Decrease Count"/>
            <br/>
            {count.value}
        </StoreContext.Provider>
    );
};

export default App;
