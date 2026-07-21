
export default function Filter(props: { searchTerm: string, setSearchTerm: (x: string) => void }) {

    return (<>
        <div>filter shown with: <input value={props.searchTerm} onChange={(e) => props.setSearchTerm(e.target.value)} /></div>
    </>)

}