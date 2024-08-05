
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination justify-content-center ">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''} `}>
              <a onClick={() => paginate(number)} href="#" className="page-link px-2"  
               style={number === currentPage ? { backgroundColor: '#12A98E', color: '#fff' } : {color:'black'}}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };


  export default Pagination