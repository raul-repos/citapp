import {signIn, type SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login(){
    const {push} = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [serverResponse, setServerResponse] = useState<SignInResponse | null>()

    useEffect(() => {
        if (serverResponse?.status == 200) void push('/logged')
    }, [ serverResponse])

    async function onLogin(){
        const response = await signIn('credentials', {username, password, redirect: false})
        setServerResponse(response)
    }

    return (
        <>
            <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Username"/>
            <input type='password' onChange={e => setPassword(e.target.value)} value={password} placeholder="Password"/>
            <button onClick={onLogin}>Login</button>
        </>
    )
}