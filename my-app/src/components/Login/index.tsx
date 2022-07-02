import { useFormik } from 'formik';
import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUsuario } from '../../service/user';
import { signIn } from '../../store/user';
import "./styles-login.css";
import jwt_decode from "jwt-decode";
import baseAPI from '../../service/baseAPI';
const Banner = require('../../assets/images/login.png'); 



// import { Container } from './styles';

const FormLogin = () => {

  const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Por favor preencha com um email válido').required('Por favor preencha com seu email'),
          password: Yup.string().required('Por favor preencha com uma senha valida').min(6, 'Sua password deve ter no mínimo 8 caracteres').max(12, 'Sua password deve ter no máximo 12 caracteres'),
        }),
        onSubmit: async values => {
          const { token, user} = await loginUsuario(values);
          // console.log(token);
          // const decoded = jwt_decode(token);          
          // localStorage.setItem('token', token);  
          // localStorage.setItem('user', JSON.stringify(decoded));
          dispatch(signIn({token}));
          //@ts-ignore
          baseAPI.defaults.headers["Authorization"] = `Bearer ${token}`
          navigate("/cadastro")
        }

        // onSubmit: async values => {
        //   const { accessToken, user } = await loginUsuario(values);
        //   // console.log(accessToken);          
        //   dispatch(signIn({accessToken}))
        //   //@ts-ignore
        //   baseAPI.defaults.headers["Authorization"] = `Bearer ${accessToken}`
        //   navigate("/cadastro")
        // }
      });

  return(

    <div className="background-login">
    <div className="containerForm-login">
      <div className="divImageLogin">
        <img src={Banner} alt="bannerlogin" />
      </div>
      <h3 className='titulo-login'>Entre na sua conta</h3>
      <p>Não possui conta? <a href='/cadastro'>Cadastre-se</a></p>
      <Form className="form-login" onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-1 espaco-login">
          <Form.Control className='linha-login' id="email" type="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && !!formik.errors.email} isValid={formik.touched.email && !formik.errors.email} />
        </Form.Group>
        <Form.Group className="mb-1 espaco-login" >
          <Form.Control className='linha-login' id="password" autoComplete='on' type="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && !!formik.errors.password} isValid={formik.touched.password && !formik.errors.password} />
        </Form.Group>
        <div className="esqueciSenha">
            <a className='esqueciSenha2' href='#'>Esqueci minha senha</a>
        </div>        
        <Button variant="" type="submit" className='botao-login'>
          Entrar
        </Button>
        {formik.errors.email && formik.touched.email 
          && ( 
            <Alert style={{marginTop: 15}} variant="danger">
              {formik.errors.email}
            </Alert> 
          )}
        {formik.errors.password && formik.touched.password 
          && ( 
            <Alert style={{marginTop: 15}} variant="danger">
              {formik.errors.password}
            </Alert> 
          )}
      </Form>
    </div>
  </div>

   
)
}

export default FormLogin;