import style from './ListBlock.module.css';
import ListItem from './ListItem/ListItem';

const ListBlock = ({ tasks, setTasks, status, setModalShow, setModalShowObj, setCheckPriority, setCheckTags }) => {
   
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
      <ul className={style.list}>
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
               <ListItem task={task} setModalShowObj={setModalShowObj} setCheckPriority={setCheckPriority} 
               setCheckTags={setCheckTags} setModalShow={setModalShow} 
               successHandle={successHandle} deleteTask={deleteTask} />
            </div>
         ))
         }
      </ul >
   )
}
export default ListBlock;