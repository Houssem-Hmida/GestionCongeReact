import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import { useEffect ,useState } from 'react';
import './Calendrier.css';

import axios from 'axios';


const Calendrier = () => {

  const [demandes, setDemandes] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8091/api/Demande/getall')
      .then((response) => {
        const approvedDemandes = response.data.filter(demand => demand.satuts === 'Approved');
        setDemandes(approvedDemandes);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }, []);
console.log(demandes)



const getTodoList = (date, demandes) => {

  const formattedDate = date.toISOString().slice(0, 10);
  const filteredDemandes = demandes.filter(demand => demand.date_debut === formattedDate);
  return filteredDemandes;
}




  function renderCell(date) {
    const list = demandes ? getTodoList(date, demandes) : [];
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index} >
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar bordered renderCell={renderCell} className='cal' />;
};

export default Calendrier;