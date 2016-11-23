import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import converter from '../services/Markdown'
import ConfirmDel from './ConfirmDel'
const glamor = require('glamor')
import '../../css/prism.css'
const Prism = require('../prism/prism')

const Article = observer(class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showConfirm: false,
        }
        this.showConfirm = this.showConfirm.bind(this)
        this.hideConfirm = this.hideConfirm.bind(this)
        this.del = this.del.bind(this)
    }
    componentDidMount() {
        Prism.highlightAll()
    }
    componentDidUpdate() {
        Prism.highlightAll()
    }
    showConfirm() {
        this.setState({showConfirm: true})
    }
    hideConfirm() {
        this.setState({showConfirm: false})
    }
    del() {
        this.setState({showConfirm: false})
        this.props.article.del(this.props.store)
        browserHistory.push('/')
    }
    render() {
        if (this.props.article.fetched || this.props.article.content) {
            return(
                <div className={`${containerStyle}`}>
                    <h1 className={`${h1Style}`}>{this.props.article.title}</h1>
                    {this.props.login && this.props.store.articleList.length
                        ?   <div style={{float: 'right'}}>
                                <Link to={{pathname: `write/${this.props.article.slug}`}}>
                                    <span className={`${editanddeleteStyle}`} style={{backgroundColor: 'lightgreen', marginRight:'10px'}}>EDIT</span>
                                </Link>
                                <a  href="#0"
                                    className={`${editanddeleteStyle}`}
                                    style={{backgroundColor: 'orangered', marginRight:'10px'}}
                                    onClick={
                                    e => {
                                        e.preventDefault()
                                        this.showConfirm()
                                    }
                                }>DELETE</a>
                            <ConfirmDel showConfirm={this.state.showConfirm}
                                        hideConfirm={this.hideConfirm}
                                        article={this.props.article}
                                        del={this.del}
                            />
                            </div>
                        :   <span></span>
                    }
                    <div className='article-content' style={{clear: 'right'}} dangerouslySetInnerHTML={{__html: converter.makeHtml(`${this.props.article.content}`)}}/>
                    <div style={{marginTop: '2em'}}>{(new Date(this.props.article.created)).toGMTString()}</div>
                </div>
            )
        }
        if (this.props.article.fetchError) {
            return <div className={`${containerStyle}`}>FETCHING FAILED...</div>
        }
        return <div className={`${containerStyle}`}>LOADING...</div>
    }
})

export default Article

let containerStyle = glamor.style({
    width: '65%',
    padding: '10px 20px 0px 20px',
    '@media(max-width: 800px)': {
        width: '95%'
    }
})
let h1Style = glamor.style({
    fontFamily: 'Optima, Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif',
    fontWeight: '600',
    textIndent: '2rem',
    display: 'inline-block',
    lineHeight: '3rem',
    fontSize: '1.8rem',
    marginBottom: '20px'
})
let editanddeleteStyle = glamor.style({
    display: 'inline-block',
    width: '65px',
    color: 'white',
    lineHeight: '2rem',
    textAlign: 'center',
    borderRadius: '3px',
    ':hover': {
        transform: 'scale(1.1)'
    }
})
