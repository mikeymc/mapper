import React, {Component} from 'react';
import IsochroneMenu from "./IsochroneMenu";

class SidebarMenu extends Component {
    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Lon: {this.props.lng} | Lat: {this.props.lat}</div>
                </div>
                <IsochroneMenu/>
            </div>
        );
    }
}

export default SidebarMenu;
