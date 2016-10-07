import React from 'react'

let styleSheet = {
    container: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: 'skyblue',
        width: 300,
        height: 200,
    }
}

const Login = () => (
    <div style={styleSheet.container}>
        <form style={styleSheet.form}>
            LOGINFORM
        </form>
    </div>
)

export default Login
