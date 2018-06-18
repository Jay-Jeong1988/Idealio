import React from 'react';
import Chosen from './Chosen';
import { Restaurant } from '../lib/requests';

function Restaurants(props) {

    return (
        <Chosen className="Chosen-select" onChange={ value => console.log(value) }>
            {   
                Restaurant.all() ?
                Restaurant.all().forEach( restaurant => {
                    return <option>{ restaurant.name }</option>
                })
                :
                ''
            }
        </Chosen>
    );
}

export default Restaurants;