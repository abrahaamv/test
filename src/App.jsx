import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Article from './Article';
import object_status from './maried_with_kids';


const WillEditor = ({ object_status, onSave }) => {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    try {
      const articleHtml = ReactDOMServer.renderToString(
        <Article props={{ data: { datas: object_status } }} />
      );
      setEditorContent(articleHtml);
    } catch (error) {
      console.error("Error rendering Article:", error);
      setEditorContent("");
    }
  }, [object_status]);

  const handleChange = (content) => {
    setEditorContent(content);
  };

  const handleSave = () => {
    onSave(editorContent);
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        theme="snow"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        }}
      />
      <button onClick={handleSave}>Save Will</button>
    </div>
  );
};

function App() {
  const handleSaveWill = (content) => {
    var willDOM = { willDOM: content }
    object_status.push(willDOM);
    console.log("object_status:", object_status);
  };


  return (
    <>
      <WillEditor
        object_status={object_status}
        onSave={handleSaveWill}
      />
    </>
  );
}

export default App;
