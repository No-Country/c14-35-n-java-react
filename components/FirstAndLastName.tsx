const firstAndLastName = () => {
    return (
        <div className="mb-4">
        <div className="grid grid-flow-row sm:grid-flow-col gap-3">
            <div className="sm:col-span-4 justify-center">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Nombre" required>
                </input>
            </div>
            <div className="sm:col-span-4 justify-center">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                Apellido
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" name="lastname" type="text" placeholder="Apellido" required>
                </input>
            </div>
        </div>
    </div>
    )
}

export default firstAndLastName;