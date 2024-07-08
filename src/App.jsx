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
  const [willVersions, setWillVersions] = useState({});

  const handleSaveWill = (content) => {
    const timestamp = new Date().toISOString();
    const versionNumber = Object.keys(willVersions).length + 1;
    const newVersion = {
      [`v${versionNumber}`]: {
        content: content,
        timestamp: timestamp
      }
    };

    setWillVersions(prevVersions => ({
      ...prevVersions,
      ...newVersion
    }));

    const updatedObjectStatus = [...object_status];
    updatedObjectStatus.push({ willDOM: { ...willVersions, ...newVersion } });
    console.log("Updated object_status:", updatedObjectStatus);
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