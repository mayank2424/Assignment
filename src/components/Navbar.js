import React from "react";
import { Link } from 'react-router-dom'
import { logoutUser } from "../redux/actions/auth"
import { connect } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Navbar extends React.Component {
    state = {
        dropdownOpen:false,
    }


     /* Toggle Dropdown */
    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top mb-5">
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>User application</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        {
                            this.props.isLoggedIn
                                ?
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li>
                                </ul>
                                :
                                <Dropdown className="navbar-nav ml-auto" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                    <DropdownToggle caret>
                                        Hey {this.props.user.user}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                         <a href="" className="p-3 cursor-pointer" onClick={this.props.logoutUser}>
                                             Logout
                                         </a>
                                    </DropdownMenu>
                            </Dropdown>
                                // <ul className="navbar-nav ml-auto">
                                //     <li className="nav-item">
                                //         <a href="#" onClick={this.props.logoutUser} className="nav-link">Logout</a>
                                //     </li>
                                // </ul>

                        }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        user:state.auth.login
    }
}
export default connect(mapStateToProps, { logoutUser })(Navbar)