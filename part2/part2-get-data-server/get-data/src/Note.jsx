export default function Note({note, onChangeImportant}){
    const buttonText = note.important ? 'make it unimportant' : 'make it important'
    return (
        <li>
            {note.content}
            <button onClick={onChangeImportant}>{buttonText}</button>
        </li>
        
    )
}