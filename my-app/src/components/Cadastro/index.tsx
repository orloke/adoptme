import { useFormik } from 'formik';
import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import banner from '../../assets/images/login.png';
import "./styles-cadastro.css"

// import { Container } from './styles';

const FormCadastro: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name_user: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name_user: Yup.string().required('Por favor preencha com seu nome'),
      email: Yup.string().email('Por favor preencha com um email válido').required('Por favor preencha com seu email'),
      password: Yup.string().required('Por favor preencha com uma password').min(8, 'Sua password deve ter no mínimo 8 caracteres').max(12, 'Sua password deve ter no máximo 12 caracteres'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As passwords não são iguais').required('Por favor preencha com uma password'),
    }),
    onSubmit: () => { }
  });

  return (

    <div className="background-cadastro">
      <div className="containerForm-cadastro">
        <div className="divImage-container">
          <img src='' alt="logo" />
        </div>
        <h3 className="titulo-cadastro">Cadastre-se</h3>
        <Form className="form-cadastro" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-1 espaco-cadastro">
            <Form.Control className='linha-cadastro' id="name_user" type="text" placeholder="Nome" value={formik.values.name_user} onChange={formik.handleChange} isInvalid={formik.touched.name_user && !!formik.errors.name_user} isValid={formik.touched.name_user && !formik.errors.name_user} />
          </Form.Group>
          <Form.Group className="mb-1 espaco-cadastro">
            <Form.Control className='linha-cadastro' id="email" type="email" placeholder="E-mail" value={formik.values.email} onChange={formik.handleChange} isInvalid={formik.touched.email && !!formik.errors.email} isValid={formik.touched.email && !formik.errors.email} />
          </Form.Group>
          <Form.Group className="mb-1 espaco-cadastro" >
            <Form.Control className='linha-cadastro' id="password" autoComplete='on' type="password" placeholder="Senha" value={formik.values.password} onChange={formik.handleChange} isInvalid={formik.touched.password && !!formik.errors.password} isValid={formik.touched.password && !formik.errors.password} />
          </Form.Group>
          <Form.Group className="mb-1 espaco-cadastro" >
            <Form.Control className='linha-cadastro' id="confirmPassword" autoComplete='on' type="password"
              value={formik.values.confirmPassword} onChange={formik.handleChange} placeholder="confirmar senha" isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword} isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword} />
          </Form.Group>
          <Button variant="" type="submit" className='botao-cadastro'>
            Cadastrar
          </Button>
          {formik.errors.email && formik.touched.email
            && (
              <Alert style={{ marginTop: 15 }} variant="danger">
                {formik.errors.email}
                {formik.errors.password && formik.touched.password
                  && (
                    <Alert style={{ marginTop: 15 }} variant="danger">
                      {formik.errors.password}
                    </Alert>
                  )}
                {formik.errors.confirmPassword && formik.touched.confirmPassword
                  && (
                    <Alert style={{ marginTop: 15 }} variant="danger">
                      {formik.errors.confirmPassword}
                    </Alert>
                  )}
              </Alert>
            )}
          <div>
            <a className="link-cadastro" href="/">Voltar</a></div>
        </Form>
      </div>
    </div>


  )
}

export default FormCadastro;