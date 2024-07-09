import React from 'react'
import PDFEditor from './PDFEditor'
import WillContent from './WillContent'
import object_status from './maried_with_kids'

const App = () => {
    return (
        <PDFEditor ContentComponent={WillContent} object_status={object_status} />
    )
}

export default App;