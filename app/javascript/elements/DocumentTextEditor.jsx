import React, { Component } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

const fontColorConfig = {
  colors: [
    {
      color: 'hsl(0, 0%, 0%)',
      label: 'Black'
    },
    {
      color: 'hsl(0, 0%, 30%)',
      label: 'Dim grey'
    },
    {
      color: 'hsl(0, 0%, 60%)',
      label: 'Grey'
    },
    {
      color: 'hsl(0, 0%, 90%)',
      label: 'Light grey'
    },
    {
      color: 'hsl(0, 0%, 100%)',
      label: 'White',
      hasBorder: true
    },
    {
      color: 'hsl(0, 75%, 60%)',
      label: 'Red'
    },
    {
      color: 'hsl(30, 75%, 60%)',
      label: 'Orange'
    },
    {
      color: 'hsl(60, 75%, 60%)',
      label: 'Yellow'
    },
    {
      color: 'hsl(90, 75%, 60%)',
      label: 'Light green'
    },
    {
      color: 'hsl(120, 75%, 60%)',
      label: 'Green'
    },
    {
      color: 'hsl(150, 75%, 60%)',
      label: 'Aquamarine'
    },
    {
      color: 'hsl(180, 75%, 60%)',
      label: 'Turquoise'
    },
    {
      color: 'hsl(210, 75%, 60%)',
      label: 'Light blue'
    },
    {
      color: 'hsl(240, 75%, 60%)',
      label: 'Blue'
    },
    {
      color: '#26276a',
      label: 'Purple'
    }
  ]
}

const renderDocumentTextEditor = ({ input }) => (
  <CKEditor
    editor={ClassicEditor}
    config={{
      plugins: [Essentials, Autoformat, FontFamily, Heading, Bold, FontSize, Alignment, FontColor],
      toolbar: [
        'heading', 'fontFamily', 'fontSize', 'fontColor', 'bold', 'alignment'
      ],
      fontColor: fontColorConfig
    }}
    onChange={(_event, editor) => {
      const data = editor.getData()
      input.onChange(data)
    }}
    content={input.value}
  />
)

export default renderDocumentTextEditor
