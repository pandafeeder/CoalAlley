import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'

let styleSheet = {
    container: {
        minWidth: 300,
        border: '2px solid blue',
    },
    ul: {
        listStyle: 'none',
    },
    link: {
        display: 'block',
    }
}

const ArticleList = observer((props) => {
    let titleList = 
         props.store.articleList.map(i => 
            <Link to={'/article/'+i.slug}
                  style={styleSheet.link}
                  key={i.slug}>{i.title}</Link>
         )
    return(
        <div style={styleSheet.container}>
            <ul style={styleSheet.ul}>
                {titleList}
            </ul>
        </div>
    )
})


export default ArticleList
