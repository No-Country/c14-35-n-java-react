"use client";
import React, { useState } from 'react'
import AccordionElement from './AccordionElement';

const Accordion = () => {
    // const [checked, setChecked] = useState(true);

    return (
        <div>
            <AccordionElement />
            <AccordionElement />
            <AccordionElement />
            <AccordionElement />
        </div>
    )
}

export default Accordion