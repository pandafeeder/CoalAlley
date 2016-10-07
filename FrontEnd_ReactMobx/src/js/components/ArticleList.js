import React from 'react'
import { observer } from 'mobx-react'

let styleSheet = {
    container: {
        minWidth: 300,
        border: '2px solid blue',
    },
    ul: {
        listStyle: 'none',
    }
}

const ArticleList = observer((props) => {
    let titleList = props.store.login
        ? props.store.articleList.map(i => <li key={i.slug}>{i.title} <a>DELETE</a> <a>EDIT</a></li>)
        : props.store.articleList.map(i => <li key={i.slug}>{i.title}</li>)
    return(
        <div style={styleSheet.container}>
            <ul style={styleSheet.ul}>
                {titleList}
            </ul>
        </div>
    )
})


export default ArticleList
