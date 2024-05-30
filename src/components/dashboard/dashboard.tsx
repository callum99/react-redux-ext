import React from 'react';
import { Container } from './dashboard.styled';
import { DashboardTypes } from './dashboard.types';
import { Heading } from "../heading/heading";
import { IncreaseButton } from '../buttons/increaseButton/increaseButton';
import { DecreaseButton } from '../buttons/decreaseButton/decreaseButton';

export const Dashboard = ({headingText, increaseBtnText, decreaseBtnText}: DashboardTypes) => {
    return (
        <Container>
            <Heading headingText={headingText}/>
            <br/>
            <IncreaseButton btnText={increaseBtnText}/>
            <DecreaseButton btnText={decreaseBtnText}/>
        </Container>
    );
};
