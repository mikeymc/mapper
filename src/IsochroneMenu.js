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
                            <div>Walking</div>
                        </label>
                        <label>
                            <input name='profile' type='radio' value='cycling'/>
                            <div>Cycling</div>
                        </label>
                        <label>
                            <input name='profile' type='radio' value='driving'/>
                            <div>Driving</div>
                        </label>
                    </div>
                    <h5>Duration</h5>
                    <div>
                        <label>
                            <input name='duration' type='radio' value='10'/>
                            <div>10 min</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='20'/>
                            <div>20 min</div>
                        </label>
                        <label>
                            <input name='duration' type='radio' value='30'/>
                            <div>30 min</div>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default IsochroneMenu;
