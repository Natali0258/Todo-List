import './style.css';
import StatusBlock from './components/StatusBlock/StatusBlock';
import FormBlock from './components/FormBlock/FormBlock';
import ListBlock from './components/ListBlock/ListBlock';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import MyVerticallyCenteredModal from './components/Popup/Popup';

function App() {
  const [modalShow, setModalShow] = useState(false);  //открыть/закрыть попап
  const [check, setCheck] = useState('');             //активная радио кнопка - приоритет в попап (none, high, medium, low)
  const [isTitleEdit, setIsTitleEdit] = useState(false); //разрешить редактировать title в popup
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const [action, setAction] = useState('');               //в popup выбирает массив priority или массив tags
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

  const [tasks, setTasks] = useState([                 //список элементов todo-list
    {
      id: 1,
      title: 'Сходить в кино',
      date: '10 jul',
      priority: 'Medium',
      success: false,
      panding: true,
      tags: ['home'],
      description: 'aaaaa'
    }
  ]);

  const [status, setStatus] = useState('total');        //статус элемента списка todo-list (total, success, panding)

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
                    modalShow={modalShow} setModalShow={setModalShow} setModalShowObj={setModalShowObj}
                    setCheck={setCheck} />

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
        check={check}
        setCheck={setCheck}
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
