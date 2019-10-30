import React from 'react'
import {Link} from 'react-router-dom'

function TableRow(props){
    const { _id, name, email, mobile} =props
    return(
        <tr>
            <td> { _id } </td>
            <td> <Link to={"contacts/"+_id}> { name } </Link></td>
            <td> { email } </td>
            <td> { mobile } </td>
           
        </tr>
    )
}
export default TableRow;