import {gql , useQuery} from "@apollo/client"


const getBooksQuery = gql`
{
    books{
        name
        id
    }
}`
const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul id="booklist">
                <li>Book Name</li>
            </ul>
        </div>
    )
}

export default BookList