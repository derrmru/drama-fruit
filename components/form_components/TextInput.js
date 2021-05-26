import style from './TextInput.module.css'

const TextInput = ({
    value,
    name,
    setValue,
    description, 
    id
}) => {
    return (
        <label 
            className={style.label} 
            style={name === 'oh_no_honey' ? {opacity: 0, position: 'fixed', top: 0} : {}}
            >
            {name.split('_').map(word => ' ' + word[0].toUpperCase() + word.toLowerCase().slice(1))}:
            <br />
            { description && <p style={{color: 'var(--drama-pink)', margin: '4px 0'}}>{description}</p> } 
            <input 
                type="text"
                id={id ? id : ''}
                className={style.input}
                value={value || ""}
                onChange={(e) => setValue(name, e.target.value)}
                required={true}
                />
        </label>
    )
}

export default TextInput