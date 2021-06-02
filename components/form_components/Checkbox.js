const Checkbox = ({
    value,
    name,
    setValue,
    description, 
    id
}) => {
    return (
        <label>
            {name.split('_').map(word => ' ' + word[0].toUpperCase() + word.toLowerCase().slice(1))}:
            <br />
            { description && <p style={{color: 'var(--drama-pink)', margin: '4px 0'}}>{description}</p> } 
            <input 
                type="checkbox"
                id={id ? id : ''}
                checked={value || ""}
                onChange={(e) => setValue(name, !value)}
                required={name === 'oh_no_honey' ? false : true}
                />
        </label>
    )
}

export default Checkbox