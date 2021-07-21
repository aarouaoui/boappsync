
export const addCard = `mutation AddCard(
        $id: ID!, 
        $title: String, 
        $type: String, 
        $content: String, 
        $author: String!, 
        $live: String, 
        $publicationDate: String
    ) {
    addCard(
            id: $id, 
            title: $title, 
            type: $type, 
            content: $content, 
            author: $author, 
            live: $live, 
            publicationDate: $publicationDate
    ) {
        author
        content
        id
        live
        publicationDate
        title
        type
    }
  }
  `;