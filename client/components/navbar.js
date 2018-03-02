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
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted={true}>
      <Menu.Item as={Link} to="/" name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          Daft Thunk Direct
        </Menu.Item>

        <Menu.Item as={Link} to="/products" name="products" active={activeItem === 'products'} onClick={this.handleItemClick}>
          Products
        </Menu.Item>

        <Menu.Item as={Link} to="/cart" name="cart" active={activeItem === 'cart'} onClick={this.handleItemClick}>
          <Icon name="cart" />
          Cart
        </Menu.Item>
        <Menu.Menu position="right">

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/signup" name="signup" active={activeItem === 'signup'} onClick={this.handleItemClick}>
            Sign Up
          </Menu.Item>
        }

        {!this.props.isLoggedIn &&
          <Menu.Item as={Link} to="/login" name="login" active={activeItem === 'login'} onClick={this.handleItemClick}>
            Login
          </Menu.Item>
        }

        {this.props.isLoggedIn &&
        <Menu.Item as={Link} to="/login" name="logout" active={activeItem === 'logout'} onClick={this.props.handleClick}>
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
