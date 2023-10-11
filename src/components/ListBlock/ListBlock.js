import { BsFillTagFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import style from './ListBlock.module.css';

const ListBlock = ({ tasks, setTasks, status, modalShow, setModalShow, setModalShowObj, setCheck }) => {
   const { list, item, itemLeft, itemRight, priority, priorityCicle, date, dateIcon, action, actionDelete, tagsBlock, tagsTitle } = style;

   const successHandle = (id) => {
      setTasks(tasks.map(elem => {
         if (elem.id === id) {
            return { ...elem, success: !elem.success, panding: !elem.panding }
         } else {
            return elem
         }
      }))
   }

   const deleteTask = (id) => {
      setTasks(tasks.filter(elem => elem.id !== id))
   }

   return (
      <ul className={list}>
         {tasks.filter(task => {
            if (status === 'success') {
               return task.success
            } else if (status === 'panding') {
               return task.panding
            } else {
               return task
            }
         }).map(task => (
            <div key={task.id}>
               <li style={{ opacity: task.success ? '0.5' : '1', cursor: 'pointer' }}
                  className={`${item} todo__item`} key={task.id}
                  onClick={(e) => {
                     setModalShowObj(task);
                     setCheck(task.priority);
                     setModalShow(true)
                  }
                  } >
                  <div style={{ textDecoration: task.success ? 'red line-through' : ' none' }}
                     className={itemLeft}>{task.title}</div>
                  <div className={itemRight}>
                     <div className={priority}>
                        <div className={priorityCicle} style={{
                           background: task.priority === 'High' ? 'red'
                              : task.priority === 'Medium' ? 'yellow'
                                 : task.priority === 'Low' ? 'blue'
                                    : 'black'
                        }}></div>
                        <span>{task.priority} priority</span>
                     </div>
                     <div className={date}>
                        <div className={dateIcon} onClick={() => console.log('tags')}>
                           <BsFillTagFill />
                        </div>
                        <span>{task.date}</span>
                     </div>
                     <div className={action} onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={task.success}
                           onChange={() => successHandle(task.id)} />
                        <div className={actionDelete} onClick={() => deleteTask(task.id)}>
                           <MdDelete />
                        </div>
                     </div>
                  </div>
               </li>

               <div className={tagsBlock}>
                  <div className={tagsTitle}>
                     <div className={dateIcon}>
                        <BsFillTagFill />
                     </div>
                     <span>Tage</span>
                  </div>
               </div>

            </div>
         ))
         }
      </ul >
   )
}
export default ListBlock;