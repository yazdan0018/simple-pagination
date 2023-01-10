import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Posts from './components/posts';
import Pagination from './components/Pagination';

function App () {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false)
    }

    fetchPosts();
  }, [])

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {setCurrentPage(pageNumber)};

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My Simple Pagination App</h1>
      <Posts loading={loading} posts={currentPosts}/>
      <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
