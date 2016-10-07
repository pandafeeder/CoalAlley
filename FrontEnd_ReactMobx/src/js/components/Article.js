import React from 'react'
import { observer } from 'mobx-react'

let styleSheet = {
    container: {
        border: '2px solid green',
        minWidth: 500,
    }
}

const Article = observer((props) => {
    if (props.article.fetched) {
        return(
            <div style={styleSheet.container}>
                <div>{props.article.title}</div>
                <div>{props.article.content}</div>
                <div>{props.article.created}</div>
            </div>
        )
    }
    return <div style={styleSheet.container}>LOADING...</div>
})

export default Article
