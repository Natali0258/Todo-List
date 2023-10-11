import './FormBlock.module.css';
import { v4 as uuidv4 } from 'uuid';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const FormBlock = ({ tasks, setTasks }) => {
   const [title, setTitle] = useState('')

   const toDate = (date) => {
      return new Intl.DateTimeFormat('en-En', {
         day: '2-digit',
         month: 'short'
         // hour12: false,
         // hour: '2-digit',
         // minute: '2-digit',
         // second: '2-digit'
      }).format(new Date(date))
   }

   // const addTask2 = (e) => {
   //    if (e.key === 'Enter' && title.trim().length) {
   //       setTasks([...tasks,
   //       {
   //          id: uuidv4(),
   //          title: title,
   //          date: toDate(new Date()),
   //          priority: 'None',
   //          success: false,
   //          padding: true,
   //          tags: [],
   //          description: ''
   //       }
   //       ])
   //    }
   //    setTitle('')
   // }

   const addTask = () => {
      if (title.trim().length) {
         setTasks([...tasks,
         {
            id: uuidv4(),
            title: title,
            date: toDate(new Date()),
            priority: 'None',
            success: false,
            panding: true,
            tags: [],
            description: ''
         }
         ])
      }
      setTitle('')
   }

   return (
      <>
         <InputGroup className="mb-3">
            <Form.Control
               placeholder="Recipient's username"
               aria-label="Recipient's username"
               aria-describedby="basic-addon2"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            // onKeyPress={addTask2}
            />
            <Button variant="outline-secondary" id="button-addon2"
               onClick={() => addTask()}>
               Button
            </Button>
         </InputGroup>
      </>
   )
}
export default FormBlock;