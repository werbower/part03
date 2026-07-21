import type { SubmitEvent } from "react";

type AddFormProps = {
    handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void,
    newName: string, setNewName: (x: string) => void, newPhoneNumber: string, setNewPhoneNumber: (x: string) => void
}

export default function AddForm({ handleSubmit, newName, setNewName, newPhoneNumber, setNewPhoneNumber }: AddFormProps) {
    return (<>
        <h2>add a new</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
            <div>phone number: <input value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>)
}