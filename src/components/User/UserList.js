import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../redux/actions/users"
import {Spinner} from 'reactstrap'
import Navbar from "../Navbar"
import User from './SingleUserComponent'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Slider from 'react-input-range'
import "../../../node_modules/react-input-range/lib/css/index.css"

import img1 from "../../images/profile1.jpg"
import img2 from "../../images/profile2.jpg"
import img3 from "../../images/profile3.png"
import img4 from "../../images/profile4.png"

class UserList extends React.Component {
    state = {
        loading:true,
        users:[],
        cloneusers:[],
        age:{
            min:5,
            max:30
        },
        name: 7,
        nameFilterActive:false,
        searchByName:'',
        dropdownOpen:false,
    }
    componentDidMount() {
        this.props.getAllUsers();
        
    }
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
       
        this.setState({[name]:value})
    }


    applyFilter = (type) => {
        const {name, age} = this.state;
        
        let filteredUsers = [];
        filteredUsers = this.state.cloneusers.filter(
            user => (
                user.age >= age.min && user.age < age.max
                ) 
                && (
                    user.fullName.length >= name 
                )
        )
        
        /* Setting state after Filter*/
        this.setState({
            users:filteredUsers
        })
    }

    filterByName = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
        let filteredUsers = [];
        filteredUsers = this.state.cloneusers.filter(user =>  user.fullName.toUpperCase().indexOf(value.toUpperCase()) > -1)
       
        this.setState({
            users:filteredUsers
        })
    }
    /* Responsible for Resetting filter ans user state*/
    resetFilter = () => {
        this.setState({
            users:this.state.cloneusers
        })

        this.setState({
            age:{
                min:5,
                max:30
            },
            name: 7,
        })
    }

    /* Toggle Dropdown */
    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    componentWillReceiveProps(nextProps) {
        let users = nextProps.users.users.map(user => {
            user.fullName = `${user.firstName} ${user.lastName}`;
            return user;
        })
        this.state.users = users;
        this.state.cloneusers = users;
        this.state.loading = false;
    }
    render() {
        return (
            <div className="h-100">
                <Navbar />
                {
                    this.state.loading 
                    ?
                    <div className="spinner w-100 h-100 d-flex align-items-center justify-content-center">
                        <Spinner
                            color="success"
                            type="grow"
                         />
                    </div>
                    :
                    <div className="container userListBox mt-5 pt-5 d-flex flex-column align-items-center">
                        <div className="row w-100 justify-content-start">
                            <div>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                    <DropdownToggle caret>
                                        Filters
                                    </DropdownToggle>
                                    <DropdownMenu right style={{minWidth:"200px", minHeight: this.state.nameFilterActive ? "" : "250px", overflowY:"auto"}} >
                                        
                                        <DropdownItem header>
                                            <div>
                                                {
                                                    this.state.nameFilterActive 
                                                        ?
                                                            <div>
                                                                <span><a href="#" onClick={() => this.setState({nameFilterActive: false}, this.resetFilter)}>Filter by Age</a></span>
                                                                
                                                            </div>
                                                        :
                                                            <div>
                                                                <span><a href="#" onClick={() => this.setState({nameFilterActive: true}, this.resetFilter)}>Search by Name</a></span>
                                                                <span><a href="#" className="ml-3" onClick={this.resetFilter}>Clear filter</a></span>
                                                            </div>
                                                }
                                               
                                            </div>
                                        </DropdownItem>
                                        
                                        {
                                            this.state.nameFilterActive 
                                            ?
                                                <div className="mt-2 mb-2 pl-3 pr-3">
                                                    <div className="mb-2">Search By Name</div>
                                                    <input 
                                                    type="text" 
                                                    name="searchByName"
                                                    className="form-control"  
                                                    onChange={this.filterByName} 
                                                    value={this.state.searchByName}
                                                    placeholder="Search by name" />
                                                </div>
                                            : 
                                            <div>
                                                <div className="mt-2 mb-4 pl-3 pr-3">
                                                    <div className="mb-4">Age</div>
                                                    <Slider
                                                        maxValue={80}
                                                        minValue={5}
                                                        formatLabel={value => `${value}`}
                                                        value={this.state.age}
                                                        onChange={value => this.setState({ age: value })}
                                                        onChangeComplete={this.applyFilter} />
                                                </div>

                                                <div className="mt-2 mb-2 pl-3 pr-3">
                                                    <div className="mb-4">Name Length</div>
                                                    <Slider
                                                        maxValue={15}
                                                        minValue={5}
                                                        formatLabel={value => `${value}`}
                                                        value={this.state.name}
                                                        onChange={value => this.setState({ name: value })}
                                                        onChangeComplete={this.applyFilter} />
                                                </div>
                                            </div>

                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="row">
                            {
                                
                                this.state.users.length 
                                ?
                                    this.state.users.map((user, index) => (
                                    <User key={index} user={user} />
                                    ))
                                :
                                    <h2 style={{color:"#999"}}>Oops No user found !</h2>

                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users:state.user,
        auth:state.auth.login
    }
}

export default connect(mapStateToProps, { getAllUsers })(UserList);