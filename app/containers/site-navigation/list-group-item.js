import React from "react"

export default function ListGroupItem({icon, label, onClick}) {
  return <div className="list-group-item" onClick={onClick}>
    <span className={`accent glyphicon glyphicon-${icon}`} />

    <span className="item-label">{label}</span>
  </div>
}
