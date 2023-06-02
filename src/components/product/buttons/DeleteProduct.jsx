import React from 'react';

function DeleteProduct({ handleClickDelete, productId }) {
  return (
    <button onClick={() => handleClickDelete(productId)} className="btn">
      Delete
    </button>
  );
}

export default DeleteProduct;
