import { useQuery} from "@apollo/client"
import { getBooksQuery } from "../queries/queries";



const BookList = () => {
const { loading, error, data } = useQuery(getBooksQuery);
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;
    console.log(data.books)

    return (
        <div>
            <ul id="booklist">
                {data.books.map(book => {
                    return (
                        <li key={book.id}>{book.name}</li>
                    )
                })}

            </ul>
        </div>
    )
}

export default BookList