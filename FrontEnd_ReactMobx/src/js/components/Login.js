import React from 'react'
const glamor = require('glamor')

const Login = (props) => {
    let nameInput
    let pswdInput 
    const submitHandler = e => {
        e.preventDefault()
        props.store.getToken(nameInput.value, pswdInput.value)
        props.closeLoginFunc()
    }
    return(
        <div className={`${containerStyle}`} style={props.show ? null : {display: 'none'}}>
            <form className={`${formStyle}`} onSubmit={submitHandler}>
                <i className="fa fa-times-circle-o" {...closeBtn} onClick={e => props.closeLoginFunc()}></i>
                <table className={`${tableStyle}`}>
                    <tbody>
                    <tr>
                        <td style={{width: '20%'}}><label for="email">Email:</label></td>
                        <td style={{width: '60%'}}><input className={`${inputStyle}`} name="email" type="text" ref={ref => nameInput=ref}/></td>
                        <td style={{width: '20%', textAlign: 'center', verticalAlign: 'middle'}} rowSpan='2'>
                            <button type="submit" className={`${submitStyle}`}>
                                <i style={{fontSize: '40px'}} className="fa fa-send-o"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="password">Password:</label></td>
                        <td><input className={`${inputStyle}`} name="password" type="password" ref={ref => pswdInput=ref}/></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Login

let containerStyle = glamor.style({
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

})
let formStyle = glamor.style({
    borderRadius: '10px',
    backgroundColor: 'steelblue',
    width: 420,
    height: 250,
    zIndex: 101,
    position: 'relative',
    boxShadow: '10px 10px 5px #888888',
})
let tableStyle = glamor.style({
    position: 'absolute',
    top: '50%',
    left: '5%',
    width: '90%',
    padding: '0px 5px 0px 5px',
    transform: 'translateY(-50%)',
})
let closeBtn = glamor.style({
    position: 'absolute',
    right: -15,
    top: -15,
    fontSize: '40px',
    color: 'navy'
})
let inputStyle = glamor.style({
    border: 'none',
    borderBottom: '1px solid #1D70CC',
    backgroundColor: 'steelblue',
    width: '100%',
    height: '30px',
    marginBottom: '10px',
    padding: '0px 5px 0px 5px',
    outlineStyle: 'none',
    ':focus': {
        backgroundColor: 'steelblue'
    }
})
let submitStyle = glamor.style({
    border: 'none',
    outline: 'none',
    backgroundColor: 'inherit',
    ':hover': {
        cursor: 'pointer'
    },
    ':active': {
        transform: 'translateY(4px)'
    }
})
