import AddEditUserForm from "../views/AddEditUserForm"

const AddUserPage = () => {
    return (
        <>
            <div className="container mx-auto p-4">

                <nav className="text-gray-500 mb-4">
                    <ol className="list-reset flex">
                        <li><a href="#" className="text-blue-600 hover:text-blue-800">Home</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li><a href="#" className="text-blue-600 hover:text-blue-800">Category</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-700">Current Page</li>
                    </ol>
                </nav>


                <header className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Page Title</h1>
                    <p className="text-lg text-gray-600 mt-1">Optional subtitle can go here</p>
                </header>


                <main className="">
                    <AddEditUserForm />
                </main>
            </div>
        </>
    )
}

export default AddUserPage