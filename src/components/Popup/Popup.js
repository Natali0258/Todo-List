import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillTagFill } from 'react-icons/bs';
import { FiEdit } from "react-icons/fi";
import style from './Popup.module.css';

const MyVerticallyCenteredModal = (props) => {
   const { titleBlock, titleBtn, titleInput, descriptionBlock, descriptionText, descriptionEdit, descriptionArea, buttonBlock, contentButton, priorityBlock, priorityLabel, priorityLabelIcon } = style;
   const { check, setCheck, obj, tasks, setTasks, isTitleEdit, setIsTitleEdit, isDescriptionEdit, setIsDescriptionEdit, action, setAction } = props;
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [tags, setTags] = useState(['Home', 'Work', 'Personal']);
   const [tagText, setTagText] = useState('');
   const [checkTag, setCheckTag] = useState(false);

   const priority = ['High', 'Medium', 'Low', 'None']

   const saveChangeHandler = (id) => {
      setTasks(tasks.map(task => {
         if (id === task.id) {
            return {
               ...task, priority: check,
               title: title.length ? title : task.title,
               description: description.length ? description : task.description
            } //при сохранении не редактированного title сохраняем текущий item.title
         } else {
            return task
         }
      }
      ))
      props.onHide() //готовая функция из библиотеки для закрытия popup
   }

   const createTag = (e) => {
      if (e.key === 'Enter' && tagText.trim().length) {
         if (tags.includes(tagText)) {
            alert('Такой тег уже существует')
         } else {
            setTags([...tags, tagText]);
         }
         setTagText('');
      }
   }

   const deleteTag = (name) => {
      setTags(tags.filter(el => el !== name))
   }

   return (
      <Modal
         {...props}
         size="md"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               Task Details
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className={titleBlock}>
               {isTitleEdit ?
                  <input type="text" defaultValue={obj.title} className={titleInput}
                     onChange={(e) => setTitle(e.target.value)} />
                  : <>
                     <h4>{obj.title}</h4>
                     <span className={titleBtn} onClick={() => setIsTitleEdit(!isTitleEdit)}>
                        <FiEdit />
                     </span>
                  </>
               }

            </div>

            <div className={descriptionBlock}>

               {isDescriptionEdit ?
                  <textarea type="text" defaultValue={obj.description} className={descriptionArea}
                     onChange={(e) => setDescription(e.target.value)} />
                  : <>
                     <p className={descriptionText}>{obj.description}</p>
                     <span className={descriptionEdit}
                        onClick={() => setIsDescriptionEdit(true)}>
                        {obj.description.length ? 'Edit ' : 'Add '
                        } description
                     </span>
                  </>
               }

            </div>

            <div className={buttonBlock}>
               <Button className={action === 'priority' ? 'active' : ''} style={{ width: '40%' }} variant="outline-primary" onClick={() => setAction('priority')}>!!!! Priority</Button>
               <Button className={action === 'tags' ? 'active' : ''} style={{ width: '40%' }} variant="outline-primary" onClick={() => setAction('tags')}>
                  <BsFillTagFill />
                  Tags</Button>
            </div>
            <div className={contentButton}>
               {
                  action === 'priority' ? priority.map((item, idx) => (
                     <div key={idx} className="mb-3">
                        <Form.Check type='radio' id={`check-api-${item}`} className={priorityBlock}>
                           <Form.Check.Input style={{ borderColor: 'blue' }} name='priority' type='radio' checked={item === check} isValid
                              onChange={() => setCheck(item)} />
                           <Form.Check.Label className={priorityLabel} style={{ color: 'blue' }}>
                              <span className={priorityLabelIcon} style={{
                                 color: item === 'High' ? 'red'
                                    : item === 'Medium' ? 'yellow'
                                       : item === 'Low' ? 'blue'
                                          : 'black'
                              }} >
                                 {`${item === 'High' || item === 'None' ? '!!!'
                                    : item === 'Medium' ? '!!'
                                       : '!'}`}</span>
                              {` ${item} priority`}</Form.Check.Label>
                        </Form.Check>
                     </div>
                  ))
                     : action === 'tags' ?
                        <div>
                           <Form.Control placeholder="Create Tag" aria-label="text" value={tagText}
                              onChange={(e) => setTagText(e.target.value)}
                              onKeyPress={createTag} />
                           {tags.map(tag => (
                              <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                 <div>
                                    <BsFillTagFill />
                                    <span style={{ marginLeft: '20px', fontSize: '18px' }}>{tag}</span>
                                 </div>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input type="checkbox" name style={{ width: '18px', height: '18px' }}
                                    //checked={checkTag} onChange={(e) => setCheckTag(!checkTag)}
                                    />
                                    <span style={{ marginLeft: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                                       onClick={() => deleteTag(tag)}>X</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                        : ''
               }
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => props.onHide()}>Close</Button>
            <Button variant="outline-primary" onClick={() => saveChangeHandler(obj.id)}>
               Save changes
            </Button>
         </Modal.Footer>
      </Modal >
   );
}
export default MyVerticallyCenteredModal;