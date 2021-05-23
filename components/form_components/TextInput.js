import style from './TextInput.module.css'

const TextInput = ({
    value,
    name,
    setValue
}) => {
    return (
        <label className={style.label}>
            {name.split('_').map(word => ' ' + word[0].toUpperCase() + word.toLowerCase().slice(1))}:
            <br />
            <input 
                type="text"
                className={style.input}
                value={value || ""}
                onChange={(e) => setValue(name, e.target.value)}
                required
                />
        </label>
    )
}

export default TextInput