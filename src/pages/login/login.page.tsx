import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'

// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

// Styles
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

// Utilities
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../../config/firebase.config'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, formState: { errors }, handleSubmit, setError } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      console.log({ userCredentials })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setError('email', { type: 'mismatchEmail' })
        setError('password', { type: 'mismatchPassword' })
      }
    }
  }

  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>Entrar com Google</CustomButton>

          <LoginSubtitle>ou entre com seu email</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput hasError={!!errors?.email} type="email" placeholder="Digite seu e-mail" {...register('email', { required: true, validate: (value) => validator.isEmail(value) })} />
            {errors?.email?.type === 'required' && <InputErrorMessage>O e-mail é obrigatório</InputErrorMessage>}
            {errors?.email?.type === 'validate' && <InputErrorMessage>Por favor, insira um e-mail válido</InputErrorMessage>}
            {errors?.email?.type === 'mismatchEmail' && <InputErrorMessage>E-mail ou senha inválidos</InputErrorMessage>}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput hasError={!!errors?.password} type="password" placeholder="Digite sua senha" {...register('password', { required: true })} />
            {errors?.password?.type === 'required' && <InputErrorMessage>A senha é obrigatória</InputErrorMessage>}
            {errors?.password?.type === 'mismatchPassword' && <InputErrorMessage>E-mail ou senha inválidos</InputErrorMessage>}
          </LoginInputContainer>

          <CustomButton startIcon={<FiLogIn size={18} />} onClick={() => handleSubmit(handleSubmitPress)()}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
