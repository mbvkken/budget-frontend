import React from 'react';
import { Nav, Body } from '../App-Styles';
import { Link } from 'react-router-dom';
import { deleteBudget, getBudgetByEpost, newBudget } from '../services/budget';
import { opprettNyKategori, endreKategori, sletteKategori } from '../services/kategori';
import { PrimaryButton } from '../App-Styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';




class BudsjettLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
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

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleNewKatClick(event) {
    event.preventDefault();
    const id = 825//this.props.match.params.id;
    const tittel = this.state.value
    console.log(id, tittel)


    try {
      await opprettNyKategori({ tittel, id });
      // const {history} = this.props;
    } catch (error) {
    }
  }

  render() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params)
    return (
      <div>
        <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>
        {/* <button onClick={this.handleNewKatClick.bind(this)}>New Kat</button> */}

        <p>Hello {id}!</p>

        <form onSubmit={this.handleNewKatClick}>
          <label>
            Name:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>

    )

  }
}

export default BudsjettLink;