import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 9;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      let tot = total / 5;
      setpageCount(Math.ceil(tot / limit));
      // console.log(tot);
      setItems(data);
    };

    getComments();
  }, []);

  const fetchComments = async currentPage => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async data => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    const dataD = await fetchComments(currentPage);
    setItems(dataD);
  };
  return (
    <div className="container">
      <article>
        {items.map(item => {
          return (
            <div key={item.id} className="cardBlock">
              <h2>{item.id}</h2>
              <h1>{item.body.slice(0, 35)}</h1>
              {/* <img src={randomPhoto} alt="" /> */}
            </div>
          );
        })}
      </article>

      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
