import React, { Component } from 'react';
// Import react router
import { Link } from 'react-router-dom';

export class MyPage extends Component {
  render() {
    return (
      <div>
        <h2>My page</h2>
        <div className='container-fluid'>
          <div className='row'>
            <nav className='col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar'>
              <ul className='nav nav-pills flex-column'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/#'>
                    Dashboard
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/#'>
                    User details
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPage;
