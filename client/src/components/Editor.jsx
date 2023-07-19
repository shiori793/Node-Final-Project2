import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

const modules = {
    toolbar: {
        handlers: {
            undo: undoChange,
            redo: redoChange
        }
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];   

const Editor = ({content, handleContent}) => {
    return (
        <ReactQuill 
            name='content'
            value={content}
            modules={modules}
            formats={formats}
            onChange={handleContent}
            required
        />
    )
}

export default Editor;