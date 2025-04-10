import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import {
  AuthError,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  signInWithPopup
} from 'firebase/auth'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import Loading from '../../components/loading/loading.component'

// Styles
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

// Utilities
import { auth, db, googleProvider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, formState: { errors }, handleSubmit, setError } = useForm<LoginForm>()
  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      setIsLoading(true)
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(query(collection(db, 'users'), where('id', '==', userCredentials.user.uid)))

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }

      console.log({ user })
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />} onClick={handleSignInWithGooglePress}>Entrar com Google</CustomButton>

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
