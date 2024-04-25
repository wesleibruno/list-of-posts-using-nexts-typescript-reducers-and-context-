import {  usePosts } from "@/contexts/PostsContext"

const Footer = () => {
const postCtx = usePosts()
    return (
        <footer>
            Total de Posts: {postCtx?.posts.length}
        </footer>
    )
}

export default Footer