import whiteLogo from "@/public/white-logo.svg";

import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-neutral">
            <footer className="footer p-10 bg-neutral text-neutral-content font-bold [&>*]:mx-auto lg:p-20 max-w-5xl mx-auto">
                <Image src={whiteLogo} alt="Logo" className="w-52 -ml-7" />
                <nav className="">
                    <header className="footer-title">Información General</header>
                    <a className="link link-hover">Contacto</a>
                </nav>
                <nav className="">
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Preguntas Frecuentes</a>
                    <a className="link link-hover">Términos y condiciones</a>
                </nav>
                <nav className="">
                    <header className="footer-title">Compañía</header>
                    <a className="link link-hover">¿Quiéres ser instructor?</a>
                    <a className="link link-hover">¿Quiénes somos?</a>
                </nav>
            </footer>
        </div>
    )
}

export default Footer