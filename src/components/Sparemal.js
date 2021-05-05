import React from 'react';
import { Typography } from '@material-ui/core'
import { offWhite, primaryGreen, secondaryGreen } from '../App-Styles'
import { Body, BudsjettIcon, Carousel, Containit } from '../App-Styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class Sparemal extends React.Component {
    render(){
        return (
            <div>
                <Typography variant="h5" style={{ margin: "0.5em 20px" }}>Mine sparemål</Typography>
                    <Containit style={{backgroundColor: 'rgba(105, 105, 105, 0.8)'}}>
                        <div style = {{position: 'absolute', padding: '1.5em', fontSize: '30px', fontWeight: '900', color: `${offWhite}`}}>Kommer snart...</div>
                        <Carousel>
                            <BudsjettIcon>
                                <AddCircleOutlineIcon style={{ fill: `${secondaryGreen}`, fontSize: "70px" }} />
                            </BudsjettIcon>
                        </Carousel>
                    </Containit>
            </div>
        )
    }
}

export default Sparemal;