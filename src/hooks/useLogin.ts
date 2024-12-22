import React, { useState } from "react"

function useLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'password') setPassword(e.target.value)
        if (e.target.id === 'email') setEmail(e.target.value)
    }

    return {
        email,
        password,
        showPassword,
        handleChangeInputs,
        handleShowPassword
    }
}

export default useLogin