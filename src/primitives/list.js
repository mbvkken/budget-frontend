import React, { useState } from 'react';
import styled from 'styled-components';
import { Body, HorizontalList } from '../App-Styles';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import EditDeleteMenu from '../primitives/edDelMenu';

export default function ListItem(props){

return(
    <HorizontalList>
<h3>{props.tittel}</h3>
<EditDeleteMenu budID={props.key}/>
    </HorizontalList>
)


}