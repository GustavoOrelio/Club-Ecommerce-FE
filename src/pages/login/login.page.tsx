import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'

// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'

// Styles
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          {/* Button Google */}
          <CustomButton startIcon={<BsGoogle size={18} />}>Entrar com Google</CustomButton>

          <LoginSubtitle>ou entre com seu email</LoginSubtitle>

          <LoginInputContainer>
            {/* Input Email */}
          </LoginInputContainer>

          <LoginInputContainer>
            {/* Input Password */}
          </LoginInputContainer>

          {/* Button Login */}
          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
