import { useState } from 'react'

interface Props {
    checkedByDefault?: boolean
}

const AccordionElement = ({ checkedByDefault }: Props) => {
    const [checked, setChecked] = useState(checkedByDefault ?? false);

    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">
                World
            </div>
            <div className="collapse-content">
                <p>hello</p>
            </div>
        </div>
    )
}

export default AccordionElement