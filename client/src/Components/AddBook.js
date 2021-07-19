import {useState} from "react"
import { useQuery} from "@apollo/client"
import {getAuthorsQuery} from "../queries/queries"

const AddBook = () => {

    const [name , setName] = useState('')
    const [genre , setGenre] = useState('')
    const [authorid , setAuthorId] = useState('')

    //apollo
    const { loading, error, data } = useQuery(getAuthorsQuery);
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>Error :(</option>;

    const submitformHandler = (e) => {
        e.preventDefault();
        console.log(name, genre,authorid)
    }
      
        return (
            <form id="add-book" onSubmit={submitformHandler}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange = {(e) => {setName(e.target.value)}}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text"  onChange = {(e) => {setGenre(e.target.value)}}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select  onChange = {(e) => {setAuthorId(e.target.value)}}>
                    <option >Select author</option>
                    {data.authors.map (author => {
                        return (
                            <option key = {author.id} value={author.id}>{author.name}</option>
                        )
                    })}
                </select>
            </div>
            <button>+</button>

        </form>
        )
    }
    
export default AddBook