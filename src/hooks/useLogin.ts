import useAlertState from "@/states/useAlertState"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "@/models/User"
import useUserState from "@/states/useUserState"

function useLogin() {
    const navigate = useNavigate()
    const { setUserState } = useUserState()
    const { setHandleState } = useAlertState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'password') setPassword(e.target.value)
        if (e.target.id === 'email') setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email.trim().toLowerCase() === "") {
            setHandleState({
                severity: 'warning',
                variant: 'filled',
                show: true,
                text: 'Debe de agregar un email.',
            })
        }
        if (password.trim() === "") {
            setHandleState({
                severity: 'warning',
                variant: 'filled',
                show: true,
                text: 'Debe de agregar un email.',
            })
        }
        const user = new User()
        const { success, signIn, errorCode } = await user.authUser(email.trim().toLowerCase(), password.trim())

        if (!success) {
            if (errorCode !== "") {
                setHandleState({
                    severity: 'error',
                    variant: 'filled',
                    show: true,
                    text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
                })
                return
            }
            setHandleState({
                severity: 'error',
                variant: 'filled',
                show: true,
                text: 'Error en el servidor.',
            })
            return
        }
        if (signIn) {
            const token = await signIn?.user.getIdToken()
            localStorage.setItem("token", token)
            setUserState(signIn.user.providerData[0])
            setHandleState({
                severity: 'success',
                variant: 'filled',
                show: true,
                text: 'Bienvenid@',
            })
            navigate("/home")
            return
        }
        setHandleState({
            severity: 'error',
            variant: 'filled',
            show: true,
            text: 'Error en el servidor.',
        })
        return
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) navigate("/home")
    }, [])


    return {
        email,
        password,
        showPassword,
        handleSubmit,
        handleChangeInputs,
        handleShowPassword
    }
}

export default useLogin