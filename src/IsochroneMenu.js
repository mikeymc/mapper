import React, {Component} from 'react';
import './IsochroneMenu.css'

class IsochroneMenu extends Component {
    render() {
        return (
            <div className='isochrone-menu'>
                <form id='params'>
                    <h5>Travel mode</h5>
                    <div>
                        <label>
                            <input name='profile' type='radio' value='walking'/>
                            <div>Walk</div>
                        </label>
                        <label>
                            <input name='profile' type='radio' value='cycling'/>
                            <div>Bike</div>
                        </label>
                        <label>
                            <input name='profile' type='radio' value='driving'/>
                            <div>Car</div>
                        </label>
                    </div>
                    <h5>Duration (min)</h5>
                    <div>
                        <label>
                            <input name='duration' type='radio' value='10'/>
                            <div>10</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='20'/>
                            <div>20</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='30'/>
                            <div>30</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='45'/>
                            <div>45</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='60'/>
                            <div>60</div>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default IsochroneMenu;
