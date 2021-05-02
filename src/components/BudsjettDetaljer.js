import React from 'react';
// import { Nav, Body } from '../App-Styles';
// import { Link } from 'react-router-dom';
import { deleteBudget } from '../services/budget';
import { opprettNyKategori, /*endreKategori, sletteKategori,*/ getKatsByBudsjettID } from '../services/kategori';
import { PrimaryButton } from '../App-Styles';

import Katdiv from './Kategori'
import SimpleModal from '../primitives/addKat';
import ControlledAccordions from '../primitives/accordian';


class BudsjettLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKat: '',
      isLoading: false,
      error: null,
      allKatsByID: [],
      kat: {
        tittel: '',
        ID: ''
      }
    };
  }

  async componentDidMount() {
    await this.populateKats();
    console.log(this.state.allKatsByID)
    // console.trace('hei');
  }


  async populateKats() {
    const id = this.props.match.params.id;
   
    try {
      this.setState({ isLoading: true });
      const kats = await getKatsByBudsjettID(id);
      this.setState({ allKatsByID: kats, isLoading: false });
      // console.log(this.state.allKatsByID)
    } catch (error) {
      this.setState({ error });
    }

  }


  async handleDeleteClick() {
    const id = this.props.match.params.id;
    console.log(id)
    if (!window.confirm('u sure?')) {
      return;
    }

    try {
      await deleteBudget(id);
      const { history } = this.props;
      history.push('/');
    } catch (error) {
      console.log('sletting av budsjett feilet...', error);
    }
  }

  async handleClicker(ID) {
  await this.setState({activeKat: ID})
  console.log(this.state.activeKat)
}

  render() {
    const id = this.props.match.params.id;
    const { kat, allKatsByID} = this.state;


    const KatsElementer = allKatsByID
      .map(({tittel, ID}) => {
        // console.log('this is '+ID)
        return (
          <div key={ID} onClick={()=>this.handleClicker(ID)}>
            <ControlledAccordions named={tittel} katid={ID}/>
          </div>
        )
      })



    return (
      <div>
        <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>

        <p>Hello {id}!</p>
<SimpleModal katID={this.props.match.params.id}/>       
        {KatsElementer}              
      </div>

    )

  }
}

export default BudsjettLink;