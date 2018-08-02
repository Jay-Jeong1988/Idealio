import React, { Component } from 'react';
import * as d3 from 'd3';

class HomeModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            types: [],
            selected_food_type: null,
            img_url: null,
            clickedIcon: null,
            isHovered: false
        }
    }

    componentDidMount(){
        this.setState({
            types: [ 'hamburgers','french','chinese','korean','franchise','japanese','vietnamese','spanish','brazilian','mexican','fine-dining','seafood','barbecue','fast-food','pizza','greek','ramen','buffet','food-court','steak-house','all-you-can-eat','food-truck','mongolian', 'breakfast', 'italian','sushi'],
            selected_food_type: '',
            img_url: '/assets/images/food_types/container_images/default-img.jpg',
            clickedIcon: null,
            isHovered: false,
            hoveredId: 'hamburgers'
        })
        this.renderFoodImage();
    }

    componentDidUpdate(){
        this.removeFoodImage();
        this.renderFoodImage();
        // this.ifHovered();
    }

    removeFoodImage = () => {
        d3.select('.left-container')
        .select('defs')
        .remove();
    }

    renderFoodImage = () => {

        const { img_url } = this.state
        
        d3.select('.left-container')
        .append('defs')
        .append('pattern')
            .attr('id', 'food-image')
            .attr('patternUnits','userSpaceOnUse')
            .attr('width','300')
            .attr('height','400')
            .attr('x','0')
            .attr('y','0')
        .append('image')
            .attr('xlink:href', img_url)
            .attr('width','300')
            .attr('height','400')
            .attr('preserveAspectRatio','xMinYMin slice')
    }

    handleClick = (e) => {
        const currentIcon = this.state.clickedIcon;
        const clickedIcon = e.currentTarget.children[0];

        this.setState({
            ...this.state,
            selected_food_type: clickedIcon.id,
            img_url: `/assets/images/food_types/container_images/${clickedIcon.id}-img.jpg`,
            clickedIcon: clickedIcon
        })

        if( currentIcon && clickedIcon !== currentIcon ){
            this.animateIcon(currentIcon, clickedIcon);
        }else if(!currentIcon) {
            clickedIcon.style.backgroundImage = `url(/assets/images/food_types/icons_coloured/${clickedIcon.id}_cl.png)`;
            clickedIcon.parentNode.parentNode.style.paddingBottom = '1px';
            clickedIcon.style.width = '60px';
            clickedIcon.style.height = '60px';
        }
    }

    animateIcon = (currentIcon, clickedIcon) => {
            currentIcon.style.backgroundImage = `url(/assets/images/food_types/icons/${currentIcon.id}.png)`;
            currentIcon.parentNode.parentNode.style.paddingBottom = '11px';
            currentIcon.style.width = '50px';
            currentIcon.style.height = '50px';

            clickedIcon.style.backgroundImage = `url(/assets/images/food_types/icons_coloured/${clickedIcon.id}_cl.png)`;
            clickedIcon.parentNode.parentNode.style.paddingBottom = '1px';
            clickedIcon.style.width = '60px';
            clickedIcon.style.height = '60px';
    }

    ifHovered = () => {
        const icon = document.getElementById(this.state.hoveredId);
        if(this.state.isHovered){
            icon.style.backgroundImage = `url(/assets/images/food_types/icons_coloured/${icon.id}_cl.png)`;
            icon.parentNode.parentNode.style.paddingBottom = '1px';
            icon.style.width = '60px';
            icon.style.height = '60px';
        }else{
            icon.style.backgroundImage = `url(/assets/images/food_types/icons/${icon.id}.png)`;
            icon.parentNode.parentNode.style.paddingBottom = '11px';
            icon.style.width = '50px';
            icon.style.height = '50px';
        }
    }

    handleHover = (e) => {
        this.setState({
            ...this.state,
            isHovered: !this.state.isHovered,
            hoveredId: e.currentTarget.children[0].id
        })
    }

    render() {
        const { types } = this.state;
        return (
            <main className="HomeModal">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#home_modal">
                    LET'S START!
                </button>
                <div id="home_modal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document" style={{marginTop: '200px', maxWidth: '600px'}}>
                        <div className="modal-content" style={{height: '400px', backgroundColor: 'white'}}>
                            <div className="modal-body" style={{backgroundColor: 'white'}}>
                                <svg className="left-container">
                                    <g stroke="black" strokeWidth="0.5" fill="url(#food-image)">
                                        <path d="M0,0h300l-30,400h-270v-400"></path>
                                    </g>
                                </svg>
                                <div className="right-container">

                                {
                                    types.map( (d, i) => {
                                        if( i % 2 === 0 ){
                                            return d ? (
                                                <div key={i} className="rows">
                                                    <div onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                                                        <div className="foodicons" id={d} style={{ backgroundImage: `url(/assets/images/food_types/icons/${d}.png)` }}></div>
                                                        <h6 style={{color: 'gray'}}>{d}</h6>
                                                    </div>
                                                    {
                                                        types[i+1] ? (
                                                            <div onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                                                                <div className="foodicons" id={ types[i+1] } style={{ backgroundImage: `url(/assets/images/food_types/icons/${types[i+1]}.png)` }}></div>
                                                                <h6 style={{color: 'gray'}}>{types[i+1]}</h6>
                                                            </div>
                                                        )
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            )
                                            :
                                            ''
                                        }
                                    })
                                }
                                    <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Meat">Meat</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                                    <div style={{color: 'silver', fontSize: '8px'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Socrates">Socrates</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default HomeModal;