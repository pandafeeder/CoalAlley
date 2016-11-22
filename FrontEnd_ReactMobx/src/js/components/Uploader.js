import React, { Component } from 'react'
import API from '../services/API'

class Uploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percent: 0,
        }
        this.upload = this.upload.bind(this)
        this.abort = this.abort.bind(this)
        this.xhr = this.xhr || new XMLHttpRequest()
    }

    upload(e) {
        e.preventDefault()
        if (! e.target.img.value) {
            alert("No files selected")
        } else {
            let data = new FormData(e.target)
            this.xhr.open('POST', API.upload)
            this.xhr.setRequestHeader('Authentication', 'Bearer '+localStorage.token)
            this.xhr.upload.addEventListener('progress', e => {
                if (e.lengthComputable) {
                    let p = parseInt((e.loaded/e.total)*100, 10)
                    this.setState({percent: p})
                }
            })
            this.xhr.send(data)
        }
    }

    abort() {
        this.xhr.abort()
        this.setState({percent: 0})
    }

    render() {
        return(
        <div style={{marginTop: '10px'}}>
            <form style={{display: 'inline-block', width: '50%'}} onSubmit={this.upload}>
                <input type="file" name='img' multiple />
                <input style={{border: 'none', 
                               padding: '5px',
                               backgroundColor: 'skyblue',
                               float: 'right',
                               marginRight: '20px'}} 
                type="submit" value="upload"/>
            </form>
            <div style={{display: 'inline-block', width: '50%'}}>
                <span style={{backgroundColor: 'lightgreen', 
                              width: `${this.state.percent*0.9}`+'%',
                              display: 'inline-block',
                              textAlign: 'center'}}>
                    {this.state.percent > 0 ? `${this.state.percent}%` : ''}
                </span>
                <button style={{float: 'right',
                                border:'none',
                                backgroundColor: 'orangered',
                                padding: '2px 5px 2px 5px'}}
                        onClick={this.abort}
                >
                    X
                </button>
            </div>
        </div>
        )
    }
}


export default Uploader
