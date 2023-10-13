import './style.css';
import StatusBlock from './components/StatusBlock/StatusBlock';
import FormBlock from './components/FormBlock/FormBlock';
import ListBlock from './components/ListBlock/ListBlock';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from './components/Popup/Popup';

function App() {
  const [modalShow, setModalShow] = useState(false);  //открыть/закрыть попап
  const [checkPriority, setCheckPriority] = useState(''); //хранит приоритет активной задачи, который отражается отмеченной радио кнопкой в попап (none, high, medium, low)
  const [checkTags, setCheckTags] = useState('');   //хранит теги активной задачи, которые отражаются отмеченными чекбоксами в попап (none, high, medium, low)
  const [isTitleEdit, setIsTitleEdit] = useState(false); //разрешить редактировать title в popup
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);  //разрешить редактировать description в popup
  const [action, setAction] = useState('');           //активная(открытая) вкладка в popup (priority, tags)
  const [modalShowObj, setModalShowObj] = useState({  //объект, данные которого отражаются в попап 
    id: null,
    title: '',
    date: '',
    priority: '',
    success: null,
    panding: null,
    tags: [],
    description: ''
  });

  const [tasks, setTasks] = useState([        //список задач
    {
      id: 1,
      title: 'Сходить в кино',
      date: '10 jul',
      priority: 'Medium',
      success: false,
      panding: true,
      tags: ['Home', 'Personal'],
      description: 'aaaaa'
    }
  ]);

  const [status, setStatus] = useState('total');        //статус элемента списка todo-list (total, success, panding)

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])


  return (
    <div className='App'>
      <div className="container">
        <div className='App__content'>
          <h1 className='App__title'>TODO-LIST</h1>

          <StatusBlock tasks={tasks} setStatus={setStatus} />

          <FormBlock tasks={tasks} setTasks={setTasks} />

          {tasks.length === 0 && status === 'total' ? <h2>Список задач пуст</h2>
            : tasks.filter(el => el.success).length === 0 && status === 'success' ? <h2>Список выполненных задач пуст</h2>
              : tasks.filter(el => el.panding).length === 0 && status === 'panding' ? <h2>Список ожидающих задач пуст</h2>
                : <>
                  <ListBlock tasks={tasks} setTasks={setTasks} status={status}
                    setModalShow={setModalShow} setModalShowObj={setModalShowObj}
                    setCheckPriority={setCheckPriority} setCheckTags={setCheckTags} />

                  <p className='App__clear'>Clear All
                    <span className='App__clear-delete'
                      onClick={() => setTasks([])}><MdDelete /></span>
                  </p>
                </>
          }

        </div>
      </div>

      <MyVerticallyCenteredModal
        tasks={tasks}
        setTasks={setTasks}
        obj={modalShowObj}
        setObj={setModalShowObj}
        checkPriority={checkPriority}
        setCheckPriority={setCheckPriority}
        checkTags={checkTags}
        setCheckTags={setCheckTags}
        show={modalShow}
        isTitleEdit={isTitleEdit}
        setIsTitleEdit={setIsTitleEdit}
        isDescriptionEdit={isDescriptionEdit}
        setIsDescriptionEdit={setIsDescriptionEdit}
        action={action}
        setAction={setAction}
        onHide={() => {
          setModalShow(false);
          setIsTitleEdit(false);
          setIsDescriptionEdit(false);
          setAction('');
        }}
      />

    </div>
  );
}

export default App;
