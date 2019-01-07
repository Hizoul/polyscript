import * as fs from "fs"
import val from "isofw-shared/src/globals/val"
import notNull from "isofw-shared/src/util/notNull"
import BaseApp from "isofw-web/src/comp"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"

const indexReplaceRegex = /<div id="root"><\/div>/

class ToRender extends React.Component<any, any> {
  public render() {
    return <div>{this.props.children}</div>
  }
}

const prerenderMaker: (webpackResults: {
    javascript: {main: string}
    styles: {main: string}
}) => any = (webpackResults) => {
  const chunks = webpackResults

  let replaceWith = ``
  if (notNull(chunks)) {
    if (notNull(chunks.javascript) && notNull(chunks.javascript.main)) {
      replaceWith += `<script src='/${chunks.javascript.main}'></script>`
    }
    if (notNull(chunks.styles) && notNull(chunks.styles.main)) {
      replaceWith += `<link rel='stylesheet' type='text/css' href='/${chunks.styles.main}' />`
    }
  }

  const indexFile = fs.readFileSync(val.isDebug ? `../isofw-web/webpackDist/index.html` : "./app/ssr.html", `utf8`)
  .replace(`<script src="./isoapp.js"><\/script>`, replaceWith)

  const handleRender = (req: any, res: any) => {
    const renderedHtml = ReactDOMServer.renderToString(<BaseApp />)
    const document = indexFile.replace(indexReplaceRegex,
    `<div id="root">${renderedHtml}</div>`)
    res.send(document)
  }
  return handleRender
}

export default prerenderMaker
