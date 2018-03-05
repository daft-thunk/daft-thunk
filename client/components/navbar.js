import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import { Menu, Icon } from 'semantic-ui-react';
import { getProductsThunk } from '../store/products';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    return (
      <Menu inverted={true}>
      <Menu.Item as={Link} to="/" name="home" >
          Daft Thunk Direct
        </Menu.Item>

        <Menu.Item as={Link} to="/products" name="products">
          Products
        </Menu.Item>

        <Menu.Item as={Link} to="/cart" name="cart">
          <Icon name="cart" />
          Cart
        </Menu.Item>
        <Menu.Menu position="right">

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/signup" name="signup">
            Sign Up
          </Menu.Item>
        }

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/login" name="login">
            Login
          </Menu.Item>
        }

        {this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/profile" name="profile">
            Profile
          </Menu.Item>
        }

        {this.props.isLoggedIn &&
        <Menu.Item as={Link} to="/login" name="logout">
          Logout
        </Menu.Item>
        }
        </Menu.Menu>
      </Menu>
    );
  }
}
// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/products">Products</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchAllProducts() {
      dispatch(getProductsThunk());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
