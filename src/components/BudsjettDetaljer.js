import React from 'react';
// import { Nav, Body } from '../App-Styles';
// import { Link } from 'react-router-dom';
import { deleteBudget } from '../services/budget';
import { opprettNyKategori, /*endreKategori, sletteKategori,*/ getKatsByBudsjettID } from '../services/kategori';
import { PrimaryButton } from '../App-Styles';
// import { Fab } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';




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
      console.log(this.state.allKatsByID)
    } catch (error) {
      this.setState({ error });
    }


  }

  // async populatePosts() {
  //   const {kat, allKatsByID} = this.state;

   
  //   allKatsByID.map(({kat}) => {
  //   try {
  //     this.setState({ isLoading: true });
  //     const posts = await getPostsBykatID(kat.id);
  //     this.setState({ allPostsByKatID: posts, isLoading: false });
  //   } catch (error) {
  //     this.setState({ error });
  //   }
  // }
  //   )


  // }

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

  handleInputChange(field, event) {
    event.preventDefault();
    this.setState({
      kat: {
        ...this.state.kat,
        [field]: event.target.value
      }

    })
  }
  async handleNewKatClick(event) {
    event.preventDefault();
    const { history } = this.props;
    const { tittel } = this.state.kat;
    const id = this.props.match.params.id;


    try {
      await opprettNyKategori(tittel, id);
      window.location.reload(false);
      // const {history} = this.props;
    } catch (error) {
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
      .map(({ID}) => {
        return (
          <div onClick={()=>this.handleClicker(ID)}>
            {ID}
          </div>
        )
      })



    return (
      <div>
        <button onClick={this.handleDeleteClick.bind(this)}>DELETE</button>
        {/* <button onClick={this.handleNewKatClick.bind(this)}>New Kat</button> */}

        <p>Hello {id}!</p>

        <form>
          <label>
            Tittel:
            <input type="text" name="tittel" value={kat.tittel} onChange={this.handleInputChange.bind(this, "tittel")}></input>
          </label>


          <div>
            <PrimaryButton onClick={this.handleNewKatClick.bind(this)}>Legg til nytt kategori</PrimaryButton>
          </div>
        </form>

        {/* <form>
          <label>
            Tittel:
            <input type="text" name="tittel" value={kat.tittel} onChange={this.handleInputChange.bind(this, "tittel")}></input>
          </label>
          <label>
          Sum:
            <input type="text" name="tittel" value={kat.tittel} onChange={this.handleInputChange.bind(this, "tittel")}></input>
          </label>
          Fast? 
          <label>
          <input type="checkbox" name="tittel" value={kat.tittel} onChange={this.handleInputChange.bind(this, "tittel")}></input>
          </label>



          <div>
            <PrimaryButton onClick={this.handleNewKatClick.bind(this)}>Legg til nytt post</PrimaryButton>
          </div>
        </form> */}

        {KatsElementer}            

        {/* <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab> */}
      </div>

    )

  }
}

export default BudsjettLink;