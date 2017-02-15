import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
const glamor = require('glamor')


const ArticleList = observer((props) => {
    let titleList = 
         props.store.articleList.map(i => 
            <Link className={`${aStyle}`}
                  to={'/article/'+i.slug}
                  key={i.slug}>{i.title}</Link>
         )
    return(
        <div className={`${containerStyle}`}>
            <ul>
                {titleList}
            </ul>
        </div>
    )
})

export default ArticleList

let containerStyle = glamor.style({
    fontFamily: 'Optima, Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif',
    width: '250px',
    borderRadius: '1px',
    backgroundColor: 'rgba(225, 225, 225, 0.2)',
    '@media(max-width: 800px)': {
        display: 'none'
    }
})

let aStyle = glamor.style({
    display: 'block',
    padding: '10px 5px 10px 5px',
    ':hover': {
        backgroundColor: '#DCDCDC',
        boxShadow: '0 2px 2px 0 rgba(0,0,0,0.2)'
    },
    ':active': {
        transform: 'translateY(3px)'
    }
})
