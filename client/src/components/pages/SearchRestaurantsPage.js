import React, { Component } from 'react';
import Chosen from '../Chosen';
import { Restaurant } from '../../lib/requests';
import { Button } from 'reactstrap';
import './SearchRestaurantsPage.css';

class SearchRestaurantsPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            restaurants: null
        }
        this.redirectToEvalPage = this.redirectToEvalPage.bind(this);
    }

    componentDidMount() {
        document.querySelector('.Navbar').style.height = '8.5vh';
        Restaurant.all().then( rests => {
            this.setState({
                restaurants: rests
            })
        })
    }

    changePhrase(event){
       event.target.innerHTML = 'OK'
    }
    changePhraseBack(event){
        const small = document.createElement('small');
        small.innerHTML = 'Rate the restaurant?';
        event.target.replaceChild(small, event.target.lastChild);
    }

    redirectToEvalPage(event){
        event.preventDefault();
        const selectedIndex = document.getElementsByClassName('Chosen-select')[0].options.selectedIndex
        const restaurantId = document.getElementsByClassName('Chosen-select')[0].options[selectedIndex].getAttribute('data-key');
        Restaurant.one(restaurantId).then( data => { 
            localStorage.setItem('restaurant', JSON.stringify(data) );
            this.props.history.push(`/evaluations/${restaurantId}`);
        })
    }

    render() {
        const { restaurants } = this.state;

        if( !restaurants ) return null;

        return (
            <main className="SearchRestaurantsPage" style={{textAlign: 'center'}}>
            <h6 style={{marginTop: '280px'}}>Can't find restaurant you know? You can add new restaurants <a href="/add_restaurant">here!</a></h6>
                <form className="evalRestaurant" onSubmit={this.redirectToEvalPage}>
                    <Chosen placeholder="Search for restaurant.." className="Chosen-select" onChange={ value => console.log(value) }>
                        <option></option>
                        {    
                            restaurants.map( restaurant => {

                                return restaurant ?
                                    ( 
                                    <option key={restaurant.id} data-key={restaurant.id} style={{backgroundImage: `url(${restaurant.imgUrl})`, backgroundSize: '18px', backgroundPosition: '97%', backgroundRepeat: 'no-repeat'}}>
                                        { `${restaurant.name.charAt(0).toUpperCase() + restaurant.name.slice(1)}`}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {restaurant.address}
                                    </option> 
                                    )
                                    :
                                    null
                            })

                        }
                    </Chosen>
                    
                    <Button color='success' type="submit" onMouseOver={this.changePhrase} onMouseLeave={this.changePhraseBack}><small>Rate the restaurant?</small></Button>
                    
                </form>
            </main>
        );
    }
}


export default SearchRestaurantsPage;