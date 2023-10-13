import { useState } from 'react';
import { BsFillTagFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import style from './ListItem.module.css';

const ListItem = ({task, setModalShowObj, setCheckPriority, setCheckTags, setModalShow,successHandle, deleteTask}) => {
   const { item, itemLeft, itemRight, priority, priorityCicle, date, dateIcon, action, actionDelete, tagsPopup, tagsTitle, tagsList, taskTag } = style;
   
   const [isTagsOpen, setIsTagsOpen] = useState(false);

   return (
      <li style={{ opacity: task.success ? '0.5' : '1', cursor: 'pointer', position: 'relative' }}
                  className={`${item} todo__item`} key={task.id}
                  onClick={(e) => {
                     setModalShowObj(task);
                     setCheckPriority(task.priority);
                     setCheckTags(task.tags)
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
                        <div className={dateIcon} onClick={(e) => {
                           e.stopPropagation();
                           setIsTagsOpen(!isTagsOpen);
                        }}>
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

                  <div className={tagsPopup} onClick={(e) => {
                     e.stopPropagation();
                     setIsTagsOpen(false);
                  }} style={{ display: isTagsOpen ? 'block' : 'none' }}>
                     <div className={tagsTitle}>
                        <div className={dateIcon}>
                           <BsFillTagFill />
                        </div>
                        <span>Tages</span>
                     </div>
                     <ul className={tagsList}>
                        {task.tags.length!==0 ?
                           task.tags.map(tag => (
                              <li className={taskTag}>{tag}</li>
                           ))
                           : <span>No tags attached</span>
                        }
                     </ul>

                  </div>

               </li>
   )
}
export default ListItem;