import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
const glamor = require('glamor')


const ArticleListSlideBar = observer((props) => {
    let titleList = 
         props.store.articleList.map(i => 
            <Link className={`${aStyle}`}
                  to={'/article/'+i.slug}
                  key={i.slug}>{i.title}</Link>
         )
    return(
        <div className={`${containerStyle}`}
             style={props.show ? {left:'0px'} :{left:'-300px'}}
        >
            <span className={`${spanStyle}`}>Article List</span>
            <ul>
                {titleList}
            </ul>
        </div>
    )
})

export default ArticleListSlideBar

let containerStyle = glamor.style({
    fontFamily: 'Optima, Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif',
    position: 'fixed',
    top: 0,
    height: '100%',
    width: '300px',
    backgroundColor: '#F0FFFF',
    transition: 'all ease-in-out 0.5s',
    boxShadow: '2px 0px 2px grey'
})

let aStyle = glamor.style({
    display: 'block',
    padding: '10px 10px 10px 20px',
    ':hover': {
        backgroundColor: '#DCDCDC',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.2)'
    },
    ':active': {
        transform: 'translateY(3px)'
    }
})

let spanStyle = glamor.style({
    fontFamily: 'Optima, Tahoma, sans-serif',
    textShadow: '0px 0px 1px grey',
    fontSize: '1.8rem',
    display: 'block',
    width: '100%',
    padding: '30px 0px 30px 10px',
})
