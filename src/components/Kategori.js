import React from 'react';
import {getPostsByKatID,opprettNyPost} from '../services/budsjettpost'
import AddPost from '../primitives/addPost'
import EditKat from '../primitives/editDeleteElements';
import EditDeleteMenu from '../primitives/edDelMenu';

import { PrimaryButton, Horiz } from '../App-Styles';


export default class Katdiv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePost: '',
            isLoading: false,
            error: null,
            allPostsByID: [],
            post: {
              tittel: '',
              ID: ''
            }
          };
        
    }

    async componentDidMount() {
        await this.populatePosts();
        // console.log(this.state.allPostsByID)
        // console.trace('hei');
      }
     

    async populatePosts() {
        const katid = this.props.katid;
        // console.log(this.props.katid, this.props.named)
       
        try {
          this.setState({ isLoading: true });
          const posts = await getPostsByKatID(katid);
          this.setState({allPostsByID: posts});
          console.log(this.state.allPostsByID)
        } catch (error) {
          this.setState({ error });
        }
      }
      
    render() {
        const id = this.props.katid;
        const {allPostsByID} = this.state;
        const postsElementer = allPostsByID.map(({tittel, sum, ID}) => {
              return (
              <div key={ID}>
              <Horiz  >
                {tittel}   {sum}kr
                <EditKat katid={ID} />
            </Horiz >
            <p>-------------------</p>

              </div>
            )
          })
        return (
            <div>
          <AddPost katid={id}/>

          {postsElementer}
            </div>
        )
    }
};