import markdown from "lib/markdown"
import React from "react"

export default function Markdown({children, ...props}) {
  return <div data-component="markdown" {...props}
    dangerouslySetInnerHTML={{
      __html: markdown.render(children)
    }}
  />
}
