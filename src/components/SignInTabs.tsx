/* eslint-disable prettier/prettier */

import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

import RegisterForm from './RegisterForm'
import SignInForm from './SignInForm'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function SignInTabs() {
  const { isLoggedIn } = useSelector((state: RootState) => state.users)
  return (
    <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="login" title="Log in">
       <SignInForm />
      </Tab>
      {isLoggedIn && <Tab eventKey="register" title="Register" disabled>
        <RegisterForm />
      </Tab>}
      {!isLoggedIn && <Tab eventKey="register" title="Register">
        <RegisterForm />
      </Tab>}
    </Tabs>
      
  )
}

export default SignInTabs
