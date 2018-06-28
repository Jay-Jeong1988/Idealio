import React, { Component } from 'react';
import { Restaurant } from '../../lib/requests';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chosen from '../Chosen';
import AddressAutoComplete from '../AddressAutoComplete';

class CreateRestaurantPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant_types: null
        }
        this.createRestaurant = this.createRestaurant.bind(this);
    }

    componentDidMount(){
        Restaurant.types().then( data => {
            this.setState({
                restaurant_types: ['izakaya','french','chinese','korean','japanese','asian','dimsum','pho','vietnamese','spanish','brazilian','bistro','fine dining','trattoria','seafood','barbeque','fast food','pizzeria','greek','ramen','buffet','food court','steak house','all you can eat','food truck','mongolian']
            })
        })

    }

    createRestaurant(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = {
            name: formData.get('name'),
            type: formData.get('type'),
            address: `${formData.get('street_address')}, ${formData.get('city')}, ${formData.get('state')}, ${formData.get('country')}, ${formData.get('zip_code')}`,
            phone_number: formData.get('phone_number'),
            website_url: formData.get('website_url'),
            imgUrl: formData.get('imgUrl')
        }
    
        Restaurant.create(params).then( data => {
            console.log(data);
            console.log('successfully added a restaurant to database');

        })

    }


    render(){
        const {restaurant_types} = this.state;

        if(!restaurant_types) return null;

        return (

            <main className="CreateRestaurantPage container mx-auto" style={{margin: '30px'}}>
                <form onSubmit={this.createRestaurant} className="mx-auto" style={{width: '60%'}}>
                    <div className="form-group">
                        <label className="form-control" htmlFor="name"><h3>Restaurant Name</h3>
                            <input className="form-control" type='text' name="name"/>
                        </label>
                    </div>
                    <div className="form-group text-center">
                        <Chosen placeholder="select restaurant type" className="Chosen-select" name="type" onChange={ value => console.log(value) } >
                            <option></option>
                            {   
                                restaurant_types.map( data => {
                                    return data ?
                                    (
                                        <option key={restaurant_types.indexOf(data)}>
                                            { data.charAt(0).toUpperCase() + data.slice(1) }
                                        </option>
                                    )
                                    :
                                    null
                                })
                            }
                        </Chosen>
                    </div>
                    <div className="form-group">
                        <label className="form-control" htmlFor="address"><h3>Restaurant Address</h3>
                            <AddressAutoComplete className="form-control" />
                        </label>
                    </div>
                        <label className="form-control" htmlFor="phone_number"><h3>Restaurant Phone Number</h3>
                            <input className="form-control" type='text' name="phone_number"/>
                        </label>
                    <div className="form-group">
                        <label className="form-control" htmlFor="website_url"><h3>Restaurant Website Url</h3>
                            <input className="form-control" type='text' name="website_url"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-control" htmlFor="imgUrl"><h3>Restaurant Logo Url</h3>
                            <input className="form-control" type='text' name="imgUrl"/>
                        </label>
                    </div>

                    <input className="form-control btn btn-outline-success" type='submit' value="Add restaurant" />
                </form>
            </main>
        )
    }
}

export default CreateRestaurantPage;