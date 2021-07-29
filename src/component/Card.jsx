import React, { Component }  from 'react';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project
import {addCard} from '../graphql/mutation'
Amplify.configure({
    auth: {
        apiKey: aws_exports.apiKey,
        type: 'API_KEY',
    },
    aws_appsync_graphqlEndpoint: aws_exports.ENDPOINT,
    aws_appsync_region: aws_exports.REGION,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: aws_exports.apiKey
  });

class Card extends Component {

    state = {
        card: {
            title: "",
            content: "",
            type: 'alert',
            author: 'Victor Fortunato',
            live: "1",
            publicationDate: ''
            
        }
    };


    handleChange = event => {
        let cardObject = this.state.card
        cardObject[event.currentTarget.name] =  event.currentTarget.value
        this.setState({ card: cardObject });
    };

    handleSubmit = async event => {
        event.preventDefault();
        let cardObject = this.state.card;
        let now = new Date()
        let month = now.getMonth() + 1
        if(month < 10) {
            month = '0' + month
        }
        
        cardObject.publicationDate = now.getFullYear() + '-' + month + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
        cardObject.id = now.getTime().toString()
        try {
            let card = await API.graphql(graphqlOperation(addCard,  cardObject));
            this.setState({card : {
                title: "",
                content: "",
                type: 'alert',
                author: 'Victor Fortunato',
                live: "1",
                publicationDate: ''
                
            }})
        } catch (e) {
            console.log(e)
        }
       
    };
    
    

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input 
                        name="title" 
                        value={this.state.card.title}
                        class="form-control" 
                        id="title" 
                        aria-describedby="titleHelp" 
                        placeholder="Enter title" 
                        onChange={this.handleChange}
                    />
                </div>

                <div class="form-group">
                    <label for="content">Description</label>
                    <textarea 
                        name="content" 
                        value={this.state.card.content}
                        class="form-control" 
                        id="content" 
                        placeholder="Description" 
                        onChange={this.handleChange}
                    ></textarea>   
                </div>
                <input name="create-card" type="submit" value="Submit"/>
            </form>
        )
    }
}

export default Card;