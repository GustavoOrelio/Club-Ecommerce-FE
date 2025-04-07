import Header from '../../components/header/header.component'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          {/* Button Google */}

          <LoginSubtitle>ou entre com seu email</LoginSubtitle>

          <LoginInputContainer>
            {/* Input Email */}
          </LoginInputContainer>

          <LoginInputContainer>
            {/* Input Password */}
          </LoginInputContainer>

          {/* Button Login */}
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
