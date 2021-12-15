import React from 'react'
import {Link} from 'react-router-dom'

export const ListLinks = ({ links }) => {
  if (!links.length) {
    return <h3 className="center">Вы ещё не сократили ни одной ссылки</h3>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Оригинал</th>
        <th>Сокращение</th>
        <th></th>
      </tr>
      </thead>

      <tbody>
      { links.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`} className="waves-effect waves-light btn-small">Открыть</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
