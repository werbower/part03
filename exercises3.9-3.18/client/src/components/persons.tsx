import type { Person } from "../App";

type PersonsProps = {filteredPersons: Person[], handlePersonDelete: (id: string)=> void}

export default function Persons({filteredPersons, handlePersonDelete}: PersonsProps) {
    return (<>
        <h2>Numbers</h2>
        {filteredPersons.map(person => (<div key={person.name}><div>
        <span >{person.name} {person.number}</span>&nbsp;
        <button type='button' onClick={()=> handlePersonDelete(person.id)}>delete</button>
        </div><br/></div>
        ))}
    </>)
}