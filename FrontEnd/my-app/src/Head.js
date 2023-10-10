import {Link} from 'react-router-dom'

const Head = () => {
    return (
      <ul>
        <li><Link to="/">DashBoard</Link></li>
        <li><Link to="/present">Present</Link></li>
        <li><Link to="/late">Late</Link></li>
        <li><Link to="/absent">Absent</Link></li>
      </ul>
    )
  }
export default Head