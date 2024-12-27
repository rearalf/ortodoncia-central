import { Button, Container } from '@mui/material'
import InputBasic from '@/components/InputBasic'
import Logo from '@/assets/images/logo.png'
import useLogin from '@/hooks/useLogin'
import '@/styles/LoginPage.css'

function LoginPage() {
	const { email, password, showPassword, handleSubmit, handleChangeInputs, handleShowPassword } = useLogin()


	return (
		<Container maxWidth="xl">
			<main className="login-page">
				<form onSubmit={handleSubmit} className="form-login">
					<h1>Inicia sesión</h1>
					<InputBasic
						required
						id="email"
						type="email"
						value={email}
						label="Correo"
						onChange={handleChangeInputs}
					/>
					<InputBasic
						required
						id="password"
						type="password"
						value={password}
						label="Contraseña"
						showPassword={showPassword}
						onChange={handleChangeInputs}
						handleShowPassword={handleShowPassword}
					/>
					<Button variant="contained" color="primary" type="submit">
						Iniciar
					</Button>
				</form>
				<img src={Logo} alt="Logo" className="logo" />
			</main>
		</Container>
	)
}

export default LoginPage
