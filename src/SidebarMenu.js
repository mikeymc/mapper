import React, {Component} from 'react';
import IsochroneMenu from "./IsochroneMenu";
import './SidebarMenu.css';

class SidebarMenu extends Component {
    render() {
        return (
            <div className='sidebarStyle'>
                <div>
                    <div>Lon: {this.props.lng} | Lat: {this.props.lat}</div>
                </div>
                <IsochroneMenu/>
            </div>
        );
    }
}

export default SidebarMenu;
