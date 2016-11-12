import React from 'react'
const glamor = require('glamor')

const ConfirmDel = (props) => {
    return (
        <div className={`${containerStyle}`} 
             style={props.showConfirm ? null : {display: 'none'}}>
            <div className={`${boarderStyle}`}>
                <span className={`${msgStyle}`}>Are you sure to delete {props.article.title}</span>
                <button className={`${btnStyle}`} onClick={e => props.del()}
                        style={{backgroundColor: 'orangered'}}
                >
                    YES
                </button>
                <button className={`${btnStyle}`} onClick={e => props.hideConfirm()}
                        style={{backgroundColor: 'lightgreen'}}
                >
                    CANCEL
                </button>
            </div>
        </div>
    )
}

export default ConfirmDel

let containerStyle = glamor.style({
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
})

let boarderStyle= glamor.style({
    width: '400px',
    height: '150px',
    backgroundColor: 'lightblue',
    textAlign: 'center',
    borderRadius: '15px',
    boxShadow: '3px 3px 3px grey',
})

let msgStyle = glamor.style({
    display: 'block',
    marginTop: '20px',
    marginBottom: '20px',
})

let btnStyle = glamor.style({
    border: 'none',
    color: 'white',
    width: '65px',
    height: '35px',
    outline: 'none',
    borderRadius: '5px',
    marginRight: '20px',
    ':hover': {
        transform: 'scale(1.1)'
    },
})
