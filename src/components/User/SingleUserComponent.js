import React from "react"
import profileImg from "../../images/profile1.jpg"
import { Badge } from 'reactstrap'

class User extends React.Component {
   
    render() {
        return (
            <div className="col-md-4 col-xl-4 col-lg-4 col-sm-12">
                <div className="singleCard">
                    <div className="img">
                        <img src={profileImg} className="img-fluid"/>
                    </div>
                    <div className="mt-4">
                        <div className="d-flex justify-content-between">
                            <h5>
                                {this.props.user.fullName}
                                <Badge className="ml-2" color="primary">
                                    {this.props.user.accountId}
                                </Badge>
                            </h5>
                            <p>
                                <span className="mr-2" style={{color:"#999"}}>Age:</span>
                                {this.props.user.age}
                            </p>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. 
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;