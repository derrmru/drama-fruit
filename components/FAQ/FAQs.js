import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types'
import style from '../../styles/FAQ.module.css'

const FAQs = ({ entries }) => {
    const [open, setOpen] = useState('')

    const richTextOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const { title, description, file } = node.data.target.fields;
                const mimeType = file.contentType
                const mimeGroup = mimeType.split('/')[0]

                switch (mimeGroup) {
                    case 'image':
                        return <div className={style.imageContainer}>
                            <img
                                title={title ? title : null}
                                className={style.image}
                                alt={description ? description : null}
                                src={file.url}
                            />
                        </div>
                    default:
                        return <span style={{ backgroundColor: 'red', color: 'white' }}> {mimeType} embedded asset </span>
                }

            },
        }
    }

    return (
        <div className={style.FAQContainer + ' fade-in'}>
            {
                entries && entries
                    .sort((a, b) => a.fields.position - b.fields.position)
                    .map((entry) => {
                        return <div key={entry.sys.id}>
                            <div
                                className={style.question}
                                onClick={() => open !== (entry.fields.question) ? setOpen(entry.fields.question) : setOpen('')}
                            >
                                <div>{entry.fields.question}</div><div className="fade-in">{open === entry.fields.question ? '-' : '+'}</div>
                            </div>
                            {
                                open === entry.fields.question && <div className={style.answer + ' fade-in'}>
                                    {documentToReactComponents(entry.fields.answer, richTextOptions)}
                                </div>
                            }
                        </div>
                    })
            }
        </div>
    )
}

export default FAQs