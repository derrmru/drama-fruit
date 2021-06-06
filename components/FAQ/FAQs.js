import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import style from '../../styles/FAQ.module.css'

const FAQs = ({ entries }) => {
    const [open, setOpen] = useState('')
    console.log(open)
    return (
        <div className={style.FAQContainer + ' fade-in'}>
            {
                entries && entries
                .sort((a, b) => a.fields.position - b.fields.position)
                .map((entry, i) => {
                    return <div key={'question' + i}>
                    <div 
                        className={style.question}
                        onClick={() => open !== (entry.fields.question) ? setOpen(entry.fields.question) : setOpen('')}
                        >
                        <div>{entry.fields.question}</div><div className="fade-in">{open === entry.fields.question ? '-' : '+'}</div>
                    </div>
                    {
                        open === entry.fields.question && <div className={style.answer + ' fade-in'}>
                            {documentToReactComponents(entry.fields.answer)}
                        </div>
                    }
                    </div>
                })
            }
        </div>
    )
}

export default FAQs