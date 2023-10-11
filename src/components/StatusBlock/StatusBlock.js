import { Button } from 'react-bootstrap';
import style from './StatusBlock.module.css';

const StatusBlock = ({ tasks, status, setStatus }) => {

   return (
      <div className={style.row}>
         <Button variant="primary" onClick={() => setStatus('total')}>TOTAL : {tasks.length}</Button>
         <Button variant="success" onClick={() => setStatus('success')}>SUCCESS : {tasks.filter(elem => elem.success).length}</Button>
         <Button variant="warning" onClick={() => setStatus('panding')}>PANDING : {tasks.filter(elem => elem.panding).length}</Button>
      </div>
   )
}
export default StatusBlock;