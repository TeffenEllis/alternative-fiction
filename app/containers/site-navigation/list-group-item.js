import React from "react"

export default function ListGroupItem({icon, label, onClick, path}) {
  return <a className="list-group-item" href={path} onClick={onClick} target="_blank">
    <span className={`accent glyphicon glyphicon-${icon}`} />

    <span className="item-label">{label}</span>
  </a>
}
