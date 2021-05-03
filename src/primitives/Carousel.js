import React, { useState } from 'react';
import styled from 'styled-components';
import { Containit, Carousel, BudsjettIcon } from '../App-Styles';
import { ReactComponent as Hus } from '../logos/hjem.svg';



export default function BudsjettCarousel(props) {
    return (
        <Containit>
            <Carousel>
                <BudsjettIcon>
                    <Hus/>
                </BudsjettIcon>
                <BudsjettIcon />
                <BudsjettIcon />
                <BudsjettIcon />
                <BudsjettIcon />
                <BudsjettIcon />
            </Carousel>

        </Containit>
        
    )

}
