import React from 'react';
import {getPostsByKatID,opprettNyPost} from '../services/budsjettpost'
import AddPost from '../primitives/addPost'
import EditKat from '../primitives/editDeleteElements';
import EditDeleteMenu from '../primitives/edDelMenu';
import {ListPosts} from '../primitives/list'

import { PrimaryButton, Horiz, PutinCorner } from '../App-Styles';


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
     
      renderPosts(posts){
        this.setState({allPostsByID: posts});
        console.log(this.state.allPostsByID)


      }
    async populatePosts() {
        const katid = this.props.katid;
        // console.log(this.props.katid, this.props.named)
       
        try {
          this.setState({ isLoading: true });
          const posts = await getPostsByKatID(katid);
          this.renderPosts(posts);
        } catch (error) {
          this.setState({ error });
        }
      }

    
      
    render() {
        const id = this.props.katid;
        const {allPostsByID} = this.state;
        const postsElementer = allPostsByID.map(({tittel, sum, ID}) => {
              return (

                <ListPosts key={ID} sum={sum} tittel={tittel} />

              // <div key={ID}>
/*                 
              <Horiz>
                {tittel}   {sum}kr
                <EditKat katid={ID} />
            </Horiz > */
      
             // </div>
            )
          })
        return (
            <div>

          {postsElementer}
          {/* <PutinCorner> */}
          <AddPost katid={id} />
          {/* </PutinCorner> */}
            </div>
        )
    }
};