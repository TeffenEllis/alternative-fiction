import React from "react"

export default function ListGroupItem({icon, label, onClick, path}) {
  const _onClick = event => {
    if (!onClick) return

    event.preventDefault()
    onClick()
  }

  return <a className="list-group-item" href={path} onClick={_onClick} target="_blank">
    <span className={`accent glyphicon glyphicon-${icon}`} />

    <span className="item-label">{label}</span>
  </a>
}
